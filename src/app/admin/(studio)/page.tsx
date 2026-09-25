import Link from "next/link";
import { ArrowRight, CalendarClock, Plus, Video } from "lucide-react";

import { Panel, Pill, StudioHeader, studioButton } from "@/components/studio/ui";
import { setAvailabilityAction } from "@/lib/admin-actions";
import { currentTime, listInquiries } from "@/lib/inbox-store";
import { listAllPosts } from "@/lib/blog-store";
import { availabilityLabels, getSiteSettings, type AvailabilityStatus } from "@/lib/site-settings";
import { cn } from "@/lib/utils";

export const metadata = { title: "Overview" };

function greeting() {
  const hour = Number(new Intl.DateTimeFormat("en-US", { hour: "numeric", hour12: false, timeZone: "Asia/Kolkata" }).format(new Date()));
  return hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
}

const when = (iso: string) =>
  new Intl.DateTimeFormat("en-US", { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit", timeZone: "Asia/Kolkata" }).format(new Date(iso));

export default async function StudioOverview() {
  const [inquiries, posts, settings] = await Promise.all([
    listInquiries().catch(() => []),
    listAllPosts().catch(() => []),
    getSiteSettings(),
  ]);
  const now = currentTime();
  const upcoming = inquiries
    .filter((i) => i.kind === "booking" && i.slot && Date.parse(i.slot) > now)
    .sort((a, b) => (a.slot! < b.slot! ? -1 : 1));
  const fresh = inquiries.filter((i) => i.status === "new");
  const monthAgo = now - 30 * 864e5;
  const last30 = inquiries.filter((i) => Date.parse(i.createdAt) > monthAgo).length;
  const won = inquiries.filter((i) => i.status === "won").length;

  const stats = [
    { label: "Needs reply", value: fresh.length, href: "/admin/inbox?status=new", hot: fresh.length > 0 },
    { label: "Upcoming calls", value: upcoming.length, href: "/admin/inbox?kind=booking" },
    { label: "Inquiries · 30 days", value: last30, href: "/admin/inbox" },
    { label: "Won", value: won, href: "/admin/inbox?status=won" },
  ];

  return (
    <div className="flex flex-col gap-8">
      <StudioHeader
        eyebrow={new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric", timeZone: "Asia/Kolkata" }).format(new Date())}
        title={<>{greeting()}, <em className="text-brand">Raj.</em></>}
        actions={
          <Link href="/admin/posts/new" className={studioButton.ink}>
            <Plus className="size-4" aria-hidden /> New post
          </Link>
        }
      >
        {fresh.length
          ? `${fresh.length} ${fresh.length === 1 ? "person is" : "people are"} waiting on a reply.`
          : "Inbox zero. Nobody is waiting on you."}
      </StudioHeader>

      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-rule bg-rule lg:grid-cols-4">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="group bg-paper p-5 transition-colors hover:bg-background">
            <p className="annot">{s.label}</p>
            <p className={cn("display mt-3 text-5xl tabular-nums", s.hot && "text-brand")}>{s.value}</p>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Panel title="Next call" className="lg:col-span-1">
          {upcoming[0] ? (
            <div className="p-5">
              <CalendarClock className="size-5 text-brand" aria-hidden />
              <p className="mt-3 text-lg font-medium">{upcoming[0].name}</p>
              <p className="text-sm text-muted-foreground">{upcoming[0].company}</p>
              <p className="mt-4 font-mono text-sm">{when(upcoming[0].slot!)} IST</p>
              {upcoming[0].topic ? <p className="mt-1 text-sm text-muted-foreground">Re: {upcoming[0].topic}</p> : null}
              <a href="https://calendar.google.com" target="_blank" rel="noreferrer noopener" className={cn(studioButton.outline, "mt-5")}>
                <Video className="size-4" aria-hidden /> Open calendar
              </a>
            </div>
          ) : (
            <p className="p-5 text-sm text-muted-foreground">No calls booked. Your booking page is live at /contact.</p>
          )}
        </Panel>

        <Panel
          title="Recent inquiries"
          className="lg:col-span-2"
          action={
            <Link href="/admin/inbox" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
              Open inbox <ArrowRight className="size-3" aria-hidden />
            </Link>
          }
        >
          {inquiries.length ? (
            <ul className="divide-y divide-rule">
              {inquiries.slice(0, 5).map((i) => (
                <li key={i.id}>
                  <Link href={`/admin/inbox#${i.id}`} className="flex items-center gap-4 px-5 py-3.5 hover:bg-background">
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-foreground/8 text-xs font-medium">
                      {i.name.slice(0, 1).toUpperCase()}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium">
                        {i.name} <span className="font-normal text-muted-foreground">· {i.company}</span>
                      </span>
                      <span className="block truncate text-xs text-muted-foreground">{i.topic ?? i.body}</span>
                    </span>
                    <Pill tone={i.status}>{i.status}</Pill>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="p-5 text-sm text-muted-foreground">
              Nothing yet. Messages and bookings from the contact page land here.
            </p>
          )}
        </Panel>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Panel title="Availability, shown sitewide" className="lg:col-span-2">
          <form action={setAvailabilityAction} className="grid gap-2 p-5 sm:grid-cols-3">
            {(Object.keys(availabilityLabels) as AvailabilityStatus[]).map((status) => {
              const active = settings.availability.status === status;
              return (
                <button
                  key={status}
                  name="status"
                  value={status}
                  aria-pressed={active}
                  className={cn(
                    "flex items-center gap-2.5 rounded-md border px-3.5 py-3 text-left text-sm transition-colors",
                    active ? "border-foreground bg-foreground text-background" : "border-rule bg-background hover:border-foreground/40",
                  )}
                >
                  <span className={cn("size-2 rounded-full", status === "open" ? "bg-ok" : status === "limited" ? "bg-amber-500" : "bg-muted-foreground")} />
                  {availabilityLabels[status]}
                </button>
              );
            })}
          </form>
          <p className="border-t border-rule px-5 py-3 text-xs text-muted-foreground">
            Note: &ldquo;{settings.availability.note || "none"}&rdquo; ·{" "}
            <Link href="/admin/site" className="underline underline-offset-2 hover:text-foreground">Edit wording</Link>
          </p>
        </Panel>

        <Panel title="Writing">
          <div className="p-5">
            <p className="display text-4xl tabular-nums">{posts.filter((p) => p.published).length}</p>
            <p className="text-sm text-muted-foreground">
              published · {posts.filter((p) => !p.published).length} draft{posts.filter((p) => !p.published).length === 1 ? "" : "s"}
            </p>
            <Link href="/admin/posts" className={cn(studioButton.outline, "mt-5")}>
              Manage posts
            </Link>
          </div>
        </Panel>
      </div>
    </div>
  );
}
