"use client";

import Link from "next/link";
import { useActionState, useEffect, useMemo, useRef, useState, useTransition } from "react";
import { ArrowLeft, Eye, ImageUp, Loader2, PenLine } from "lucide-react";
import { toast } from "sonner";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Pill, studioButton } from "@/components/studio/ui";
import type { BlogPostRecord } from "@/lib/blog-store";
import { savePostAction, uploadCoverImageAction, type PostFormState, type UploadState } from "@/lib/admin-actions";
import { cn } from "@/lib/utils";

const initialState: PostFormState = { status: "idle" };
const initialUploadState: UploadState = {};

// Preview only: the public page renders with the same remark pipeline plus
// syntax highlighting, which isn't worth shipping to the editor bundle.
const markdown = unified().use(remarkParse).use(remarkGfm).use(remarkRehype).use(rehypeStringify);

function slugify(input: string): string {
  return input.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-+|-+$)/g, "");
}

const input = "bg-background focus-visible:border-brand focus-visible:ring-brand/20";

export function PostForm({ post, justSaved }: { post?: BlogPostRecord; justSaved?: boolean }) {
  const isEditing = Boolean(post);
  const [state, formAction, saving] = useActionState(savePostAction, initialState);
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(isEditing);
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [coverImage, setCoverImage] = useState(post?.coverImage ?? "");
  const [published, setPublished] = useState(post ? post.published : false);
  const [view, setView] = useState<"write" | "preview">("write");
  const [uploadState, setUploadState] = useState<UploadState>({});
  const [uploadPending, startUpload] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const stayRef = useRef<HTMLInputElement>(null);

  const words = content.trim() ? content.trim().split(/\s+/).length : 0;
  const html = useMemo(() => {
    try {
      return String(markdown.processSync(content));
    } catch {
      return "<p>Preview unavailable.</p>";
    }
  }, [content]);

  useEffect(() => {
    if (justSaved) toast.success("Saved");
  }, [justSaved]);

  useEffect(() => {
    if (state.status === "error" && state.message) toast.error(state.message);
  }, [state]);

  // ⌘S / Ctrl+S saves and stays on the page.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        if (stayRef.current) stayRef.current.value = "1";
        formRef.current?.requestSubmit();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.set("file", file);
    startUpload(async () => {
      const result = await uploadCoverImageAction(initialUploadState, fd);
      setUploadState(result);
      if (result.url) setCoverImage(result.url);
    });
  }

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-6">
      {isEditing ? <input type="hidden" name="originalSlug" value={post!.slug} /> : null}
      <input ref={stayRef} type="hidden" name="stay" defaultValue="" />
      <input type="hidden" name="published" value={published ? "on" : ""} />

      {/* Top bar */}
      <div className="sticky top-0 z-10 -mx-5 flex flex-wrap items-center justify-between gap-3 border-b border-rule bg-background/90 px-5 py-3 backdrop-blur sm:-mx-8 sm:px-8">
        <div className="flex items-center gap-3">
          <Link href="/admin/posts" className={studioButton.ghost}>
            <ArrowLeft className="size-4" aria-hidden /> Writing
          </Link>
          <Pill tone={published ? "published" : "draft"}>{published ? "Will publish" : "Draft"}</Pill>
          <span className="hidden font-mono text-xs text-muted-foreground sm:inline">
            {words} words · {Math.max(1, Math.round(words / 200))} min read
          </span>
        </div>
        <div className="flex items-center gap-3">
          <label className="flex cursor-pointer items-center gap-2 text-sm">
            <span className="text-muted-foreground">Published</span>
            <button
              type="button"
              role="switch"
              aria-checked={published}
              onClick={() => setPublished((p) => !p)}
              className={cn("relative h-5 w-9 rounded-full transition-colors", published ? "bg-ok" : "bg-foreground/20")}
            >
              <span className={cn("absolute top-0.5 size-4 rounded-full bg-white shadow transition-transform", published ? "translate-x-[18px]" : "translate-x-0.5")} />
            </button>
          </label>
          <span className="hidden text-xs text-muted-foreground lg:inline">⌘S to save</span>
          <button type="submit" disabled={saving} className={studioButton.ink} onClick={() => stayRef.current && (stayRef.current.value = "")}>
            {saving ? <Loader2 className="size-4 animate-spin" aria-hidden /> : null}
            {saving ? "Saving…" : "Save & close"}
          </button>
        </div>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1fr_20rem]">
        {/* Writing surface */}
        <div className="flex min-w-0 flex-col gap-5">
          <label htmlFor="title" className="sr-only">Title</label>
          <textarea
            id="title"
            name="title"
            rows={2}
            value={title}
            required
            placeholder="Post title"
            onChange={(e) => {
              setTitle(e.target.value);
              if (!slugTouched) setSlug(slugify(e.target.value));
            }}
            className="display field-sizing-content resize-none bg-transparent text-4xl outline-none placeholder:text-muted-foreground/50 sm:text-5xl"
          />
          <label htmlFor="excerpt" className="sr-only">Excerpt</label>
          <textarea
            id="excerpt"
            name="excerpt"
            rows={2}
            value={excerpt}
            required
            placeholder="One or two sentences that make someone want to read it…"
            onChange={(e) => setExcerpt(e.target.value)}
            className="field-sizing-content resize-none bg-transparent text-lg leading-relaxed text-muted-foreground outline-none placeholder:text-muted-foreground/50"
          />

          <div className="rounded-lg border border-rule bg-paper">
            <div className="flex items-center gap-1 border-b border-rule px-2 py-1.5" role="tablist" aria-label="Editor view">
              {(["write", "preview"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  role="tab"
                  aria-selected={view === v}
                  onClick={() => setView(v)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-sm capitalize xl:hidden",
                    view === v ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {v === "write" ? <PenLine className="size-3.5" aria-hidden /> : <Eye className="size-3.5" aria-hidden />} {v}
                </button>
              ))}
              <span className="annot hidden px-2 xl:inline">Markdown · live preview</span>
            </div>
            <div className="grid xl:grid-cols-2">
              <textarea
                id="content"
                name="content"
                aria-label="Content (Markdown)"
                value={content}
                required
                onChange={(e) => setContent(e.target.value)}
                placeholder={"## A heading\n\nWrite in Markdown. Code fences, tables and links all work."}
                className={cn(
                  "min-h-[60vh] resize-y bg-transparent p-5 font-mono text-sm leading-relaxed outline-none xl:block xl:border-r xl:border-rule",
                  view === "write" ? "block" : "hidden",
                )}
              />
              <div
                className={cn(
                  "prose prose-neutral max-w-none overflow-auto p-5 dark:prose-invert prose-headings:font-display prose-headings:font-normal prose-a:text-brand xl:block xl:max-h-[75vh]",
                  view === "preview" ? "block" : "hidden",
                )}
                dangerouslySetInnerHTML={{ __html: html || "<p class='text-muted-foreground'>Nothing to preview yet.</p>" }}
              />
            </div>
          </div>
        </div>

        {/* Settings rail */}
        <aside className="flex flex-col gap-5 xl:sticky xl:top-20 xl:self-start">
          <div className="flex flex-col gap-4 rounded-lg border border-rule bg-paper p-4">
            <p className="annot">Post settings</p>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="slug">URL</Label>
              <div className="flex items-center rounded-md border border-input bg-background pl-2.5 focus-within:border-brand">
                <span className="font-mono text-xs text-muted-foreground">/blog/</span>
                <input
                  id="slug"
                  name="slug"
                  value={slug}
                  required
                  onChange={(e) => {
                    setSlugTouched(true);
                    setSlug(e.target.value);
                  }}
                  className="h-9 min-w-0 flex-1 bg-transparent pr-2.5 font-mono text-xs outline-none"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="channel">Channel</Label>
              <select
                id="channel"
                name="channel"
                defaultValue={post?.channel ?? "technical"}
                className="h-9 rounded-md border border-input bg-background px-2.5 text-sm outline-none focus-visible:border-brand"
              >
                <option value="technical">Technical</option>
                <option value="business">For Clients</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="date">Publish date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                defaultValue={post?.date ? post.date.slice(0, 10) : new Date().toISOString().slice(0, 10)}
                required
                className={input}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 rounded-lg border border-rule bg-paper p-4">
            <p className="annot">Cover image</p>
            {coverImage ? (
              // eslint-disable-next-line @next/next/no-img-element -- arbitrary Blob/local URL preview
              <img src={coverImage} alt="" className="aspect-video w-full rounded-md border border-rule object-cover" />
            ) : (
              <div className="grid aspect-video place-items-center rounded-md border border-dashed border-rule text-xs text-muted-foreground">
                No cover yet
              </div>
            )}
            <label className={cn(studioButton.outline, "cursor-pointer justify-center")}>
              {uploadPending ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <ImageUp className="size-4" aria-hidden />}
              {uploadPending ? "Uploading…" : "Upload image"}
              <input type="file" accept="image/*" disabled={uploadPending} onChange={handleFileChange} className="sr-only" />
            </label>
            {uploadState.error ? <p className="text-xs text-destructive">{uploadState.error}</p> : null}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="coverImage" className="text-xs">or image URL</Label>
              <Input id="coverImage" name="coverImage" value={coverImage} onChange={(e) => setCoverImage(e.target.value)} required className={cn(input, "h-9 text-xs")} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="coverImageAlt" className="text-xs">Alt text</Label>
              <Textarea id="coverImageAlt" name="coverImageAlt" rows={2} defaultValue={post?.coverImageAlt} required className={cn(input, "text-xs")} />
            </div>
          </div>
        </aside>
      </div>
    </form>
  );
}
