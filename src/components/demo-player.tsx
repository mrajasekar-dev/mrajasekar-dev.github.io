"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Captions, Maximize, Minimize, Pause, Play, RotateCcw, Volume2, VolumeX } from "lucide-react";

import { cn } from "@/lib/utils";

type Props = { src: string; poster: string; captions?: string; title: string };

const fmt = (s: number) => {
  if (!Number.isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
};

/** A quiet, custom video player: poster and one play button first, then a thin control bar that gets out of the way. */
export function DemoPlayer({ src, poster, captions, title }: Props) {
  const box = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLDivElement>(null);
  const knob = useRef<HTMLDivElement>(null);
  const buffer = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [muted, setMuted] = useState(false);
  const [cc, setCc] = useState(false);   // the video already carries on-screen captions; this is for sound-off viewing
  const [full, setFull] = useState(false);
  const [duration, setDuration] = useState(0);
  const [now, setNow] = useState(0);
  const [awake, setAwake] = useState(true);
  const [scrubbing, setScrubbing] = useState(false);
  const [load, setLoad] = useState(false);

  // Fetch nothing until the player is near the viewport; then only the metadata.
  useEffect(() => {
    const node = box.current;
    if (!node) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setLoad(true), io.disconnect()), { rootMargin: "300px" });
    io.observe(node);
    return () => io.disconnect();
  }, []);

  // Smooth progress: drive the bar from animation frames, not the 4Hz timeupdate event.
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const v = video.current;
      if (v && v.duration) {
        const p = v.currentTime / v.duration;
        if (fill.current) fill.current.style.transform = `scaleX(${p})`;
        if (knob.current) knob.current.style.left = `${p * 100}%`;
        if (buffer.current && v.buffered.length) buffer.current.style.transform = `scaleX(${v.buffered.end(v.buffered.length - 1) / v.duration})`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const on = () => setFull(document.fullscreenElement === box.current);
    document.addEventListener("fullscreenchange", on);
    return () => document.removeEventListener("fullscreenchange", on);
  }, []);

  useEffect(() => {
    const t = video.current?.textTracks[0];
    if (t) t.mode = cc ? "showing" : "hidden";
  }, [cc, load]);

  const wake = useCallback(() => {
    setAwake(true);
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setAwake(false), 2400);
  }, []);
  useEffect(() => () => clearTimeout(hideTimer.current), []);

  const toggle = useCallback(() => {
    const v = video.current;
    if (!v) return;
    setStarted(true);
    if (v.ended) v.currentTime = 0;
    if (v.paused) void v.play().catch(() => undefined);
    else v.pause();
    wake();
  }, [wake]);

  const seekBy = (d: number) => {
    const v = video.current;
    if (v) v.currentTime = Math.max(0, Math.min(v.duration || 0, v.currentTime + d));
  };

  const seekTo = (clientX: number) => {
    const v = video.current, r = bar.current?.getBoundingClientRect();
    if (!v || !r || !v.duration) return;
    v.currentTime = Math.max(0, Math.min(1, (clientX - r.left) / r.width)) * v.duration;
  };

  const fullscreen = () => {
    const b = box.current, v = video.current as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null;
    if (!b || !v) return;
    if (document.fullscreenElement) void document.exitFullscreen();
    else if (b.requestFullscreen) void b.requestFullscreen();
    else v.webkitEnterFullscreen?.();           // iPhone Safari
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.target instanceof HTMLButtonElement && (e.key === " " || e.key === "Enter")) return;
    const k = e.key.toLowerCase();
    if (k === " " || k === "k") toggle();
    else if (k === "arrowleft") seekBy(-5);
    else if (k === "arrowright") seekBy(5);
    else if (k === "m") setMuted((m) => !m);
    else if (k === "f") fullscreen();
    else if (k === "c" && captions) setCc((c) => !c);
    else return;
    e.preventDefault();
    wake();
  };

  const idle = playing && !awake && !scrubbing;
  const btn = "grid size-9 place-items-center rounded-full text-white/90 transition-colors hover:bg-white/15 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-white motion-reduce:transition-none";

  return (
    <div
      ref={box}
      role="group"
      aria-label={title}
      tabIndex={0}
      onKeyDown={onKey}
      onMouseMove={wake}
      onTouchStart={wake}
      className={cn(
        "group/player relative isolate aspect-video w-full select-none overflow-hidden rounded-xl border border-rule bg-[#efeeea] outline-none",
        "focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        full && "rounded-none border-0",
        idle && "cursor-none",
      )}
    >
      <video
        ref={video}
        src={load ? src : undefined}
        poster={poster}
        preload="metadata"
        playsInline
        muted={muted}
        onClick={toggle}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onTimeUpdate={(e) => !scrubbing && setNow(e.currentTarget.currentTime)}
        onPlay={() => { setPlaying(true); setEnded(false); setStarted(true); wake(); }}
        onPause={() => setPlaying(false)}
        onEnded={() => { setPlaying(false); setEnded(true); setAwake(true); }}
        onWaiting={() => setWaiting(true)}
        onPlaying={() => setWaiting(false)}
        onCanPlay={() => setWaiting(false)}
        className="absolute inset-0 size-full object-contain"
      >
        {captions && <track kind="captions" src={captions} srcLang="en" label="English" default />}
      </video>

      {/* Start / replay: a single quiet button over the poster. */}
      <div
        aria-hidden={started && !ended}
        className={cn(
          "pointer-events-none absolute inset-0 grid place-items-center transition-opacity duration-500 motion-reduce:transition-none",
          started && !ended ? "opacity-0" : "opacity-100",
        )}
      >
        <button
          type="button"
          tabIndex={started && !ended ? -1 : 0}
          onClick={toggle}
          aria-label={ended ? `Replay ${title}` : `Play ${title}`}
          className={cn(
            "pointer-events-auto grid size-[72px] place-items-center rounded-full bg-white/90 text-[#14171c] shadow-[0_8px_30px_-8px_rgba(20,30,50,.35)] backdrop-blur",
            "transition-transform duration-300 ease-out hover:scale-105 active:scale-95 motion-reduce:transition-none",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
          )}
        >
          {ended ? <RotateCcw className="size-6" aria-hidden /> : <Play className="ml-0.5 size-6 fill-current" aria-hidden />}
        </button>
      </div>

      {!started && (
        <p className="pointer-events-none absolute bottom-4 left-5 text-[13px] font-medium text-[#2a2f38]">
          Watch the demo <span className="text-[#5a6270]">· 0:41</span>
        </p>
      )}

      {waiting && playing && (
        <div aria-hidden className="pointer-events-none absolute inset-0 grid place-items-center">
          <span className="size-9 animate-spin rounded-full border-2 border-white/30 border-t-white motion-reduce:animate-none" />
        </div>
      )}

      {/* Controls: a soft scrim and one thin row, hidden while the video plays undisturbed. */}
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/45 via-black/12 to-transparent px-3 pb-2.5 pt-10 transition-opacity duration-300 motion-reduce:transition-none",
          started && !idle ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div
          ref={bar}
          role="slider"
          aria-label="Seek"
          aria-valuemin={0}
          aria-valuemax={Math.round(duration)}
          aria-valuenow={Math.round(now)}
          aria-valuetext={`${fmt(now)} of ${fmt(duration)}`}
          tabIndex={-1}
          onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); setScrubbing(true); seekTo(e.clientX); }}
          onPointerMove={(e) => scrubbing && seekTo(e.clientX)}
          onPointerUp={(e) => { setScrubbing(false); setNow(video.current?.currentTime ?? 0); e.currentTarget.releasePointerCapture(e.pointerId); }}
          className="group/bar relative mx-1 flex h-4 cursor-pointer touch-none items-center"
        >
          <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-white/25 transition-[height] duration-200 group-hover/bar:h-[5px] motion-reduce:transition-none">
            <div ref={buffer} className="absolute inset-0 origin-left scale-x-0 bg-white/30" />
            <div ref={fill} className="absolute inset-0 origin-left scale-x-0 bg-white" />
          </div>
          <div ref={knob} className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full bg-white shadow transition-transform duration-200 group-hover/bar:scale-100 motion-reduce:transition-none" style={{ left: 0 }} />
        </div>

        <div className="mt-0.5 flex items-center gap-0.5">
          <button type="button" onClick={toggle} aria-label={playing ? "Pause" : "Play"} className={btn}>
            {playing ? <Pause className="size-[18px] fill-current" aria-hidden /> : <Play className="size-[18px] fill-current" aria-hidden />}
          </button>
          <button type="button" onClick={() => setMuted((m) => !m)} aria-label={muted ? "Unmute" : "Mute"} className={btn}>
            {muted ? <VolumeX className="size-[18px]" aria-hidden /> : <Volume2 className="size-[18px]" aria-hidden />}
          </button>
          <span className="ml-1.5 text-xs tabular-nums text-white/85">
            {fmt(now)} <span className="text-white/55">/ {fmt(duration)}</span>
          </span>
          <span className="flex-1" />
          {captions && (
            <button type="button" onClick={() => setCc((c) => !c)} aria-label="Captions" aria-pressed={cc} className={cn(btn, !cc && "text-white/50")}>
              <Captions className="size-[19px]" aria-hidden />
            </button>
          )}
          <button type="button" onClick={fullscreen} aria-label={full ? "Exit full screen" : "Full screen"} className={btn}>
            {full ? <Minimize className="size-[18px]" aria-hidden /> : <Maximize className="size-[18px]" aria-hidden />}
          </button>
        </div>
      </div>

      <style>{`
        video::cue { background: rgba(20,23,28,.78); color: #fff; font: 500 1rem/1.4 system-ui, sans-serif; }
      `}</style>
    </div>
  );
}
