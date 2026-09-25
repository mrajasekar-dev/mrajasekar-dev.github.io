import Link from "next/link";
import { CalendarClock, Mail, MessageSquare, Trash2 } from "lucide-react";

import { Pill, StudioHeader, studioButton } from "@/components/studio/ui";
import { ConfirmSubmit } from "@/components/studio/confirm-submit";
import { deleteInquiryAction, setInquiryStatusAction } from "@/lib/admin-actions";
import { currentTime, listInquiries, type Inquiry, type InquiryStatus } from "@/lib/inbox-store";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export const metadata = { title: "Inbox" };

const filters: { key: string; label: string; match: (i: Inquiry) => boolean }[] = [
  { key: "open", label: "Open", match: (i) => i.status === "new" || i.status === "replied" },
  { key: "new", label: "Needs reply", match: (i) => i.status === "new" },
  { key: "booking", label: "Calls", match: (i) => i.kind === "booking" },
  { key: "won", label: "Won", match: (i) => i.status === "won" },
  { key: "archived", label: "Archived", match: (i) => i.status === "archived" },
  { key: "all", label: "All", match: () => true },
];

const fmt = (iso: string, withTime = true) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    ...(withTime ? { hour: "numeric", minute: "2-digit" } : {}),
    timeZone: "Asia/Kolkata",
  }).format(new Date(iso));

function replyHref(i: Inquiry) {
  const first = i.name.split(" ")[0];
  const subject = i.kind === "booking" ? `Our call${i.slot ? ` on ${fmt(i.slot, false)}` : ""}` : `Re: ${i.topic ?? "your Salesforce question"}`;
  const body = `Hi ${first},\n\nThanks for reaching out about ${i.topic ? i.topic.toLowerCase() : "your Salesforce work"}.\n\n\n\nBest,\nRaj\n${siteConfig.url}`;
  return `mailto:${i.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

const nextStatuses: Record<InquiryStatus, { status: InquiryStatus; label: string }[]> = {
  new: [{ status: "replied", label: "Mark replied" }, { status: "archived", label: "Archive" }],
  replied: [{ status: "won", label: "Mark won" }, { status: "archived", label: "Archive" }],
  won: [{ status: "replied", label: "Reopen" }],
  archived: [{ status: "new", label: "Restore" }],
};

export default async function InboxPage({ searchParams }: PageProps<"/admin/inbox">) {
  const params = await searchParams;
  const key =
    typeof params.status === "string" ? params.status : typeof params.kind === "string" ? params.kind : "open";
  const active = filters.find((f) => f.key === key) ?? filters[0];
  const all = await listInquiries().catch(() => []);
  const items = all.filter(active.match);
  const now = currentTime();

  return (
    <div className="flex flex-col gap-6">
      <StudioHeader eyebrow="Leads" title="Inbox">
        Every message and booking from the site. Reply from your own mail client, then move it along.
      </StudioHeader>

      <nav aria-label="Filter" className="flex gap-1 overflow-x-auto">
        {filters.map((f) => {
          const count = all.filter(f.match).length;
          const on = f.key === active.key;
          return (
            <Link
              key={f.key}
              href={f.key === "open" ? "/admin/inbox" : f.key === "booking" ? "/admin/inbox?kind=booking" : `/admin/inbox?status=${f.key}`}
              aria-current={on ? "page" : undefined}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm transition-colors",
                on ? "border-foreground bg-foreground text-background" : "border-rule hover:border-foreground/40",
              )}
            >
              {f.label}
              <span className={cn("font-mono text-xs tabular-nums", on ? "text-background/60" : "text-muted-foreground")}>{count}</span>
            </Link>
          );
        })}
      </nav>

      {items.length === 0 ? (
        <div className="rounded-lg border border-dashed border-rule p-12 text-center">
          <p className="display text-3xl">Nothing here.</p>
          <p className="mt-2 text-sm text-muted-foreground">
            {all.length ? "Try another filter." : "When someone writes or books through /contact, it shows up here."}
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {items.map((i) => (
            <li key={i.id} id={i.id} className="scroll-mt-6 rounded-lg border border-rule bg-paper target:ring-2 target:ring-brand">
              <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex min-w-0 gap-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-foreground/8">
                    {i.kind === "booking" ? <CalendarClock className="size-4" aria-hidden /> : <MessageSquare className="size-4" aria-hidden />}
                  </span>
                  <div className="min-w-0">
                    <p className="font-medium">
                      {i.name} <span className="font-normal text-muted-foreground">· {i.company}</span>
                    </p>
                    <a href={`mailto:${i.email}`} className="text-sm text-muted-foreground hover:text-brand">
                      {i.email}
                    </a>
                    <div className="mt-2 flex flex-wrap items-center gap-1.5">
                      <Pill tone={i.status}>{i.status}</Pill>
                      <Pill tone={i.kind}>{i.kind === "booking" ? "call" : "message"}</Pill>
                      {i.topic ? <span className="text-xs text-muted-foreground">· {i.topic}</span> : null}
                    </div>
                  </div>
                </div>
                <p className="annot shrink-0 tabular-nums">Received {fmt(i.createdAt)}</p>
              </div>

              {i.kind === "booking" && i.slot ? (
                <p className="mx-5 mb-4 rounded-md bg-foreground px-3.5 py-2.5 font-mono text-sm text-background">
                  Call · {fmt(i.slot)} IST {Date.parse(i.slot) < now ? "(past)" : ""}
                </p>
              ) : null}

              {i.body ? (
                <p className="mx-5 mb-4 whitespace-pre-wrap border-l-2 border-rule pl-4 text-sm leading-relaxed text-foreground/85">{i.body}</p>
              ) : null}

              {i.budget || i.timeline ? (
                <dl className="mx-5 mb-4 flex flex-wrap gap-x-6 gap-y-1 text-sm">
                  {i.budget ? (
                    <div className="flex gap-2">
                      <dt className="text-muted-foreground">Budget</dt>
                      <dd>{i.budget}</dd>
                    </div>
                  ) : null}
                  {i.timeline ? (
                    <div className="flex gap-2">
                      <dt className="text-muted-foreground">Timeline</dt>
                      <dd>{i.timeline}</dd>
                    </div>
                  ) : null}
                </dl>
              ) : null}

              <div className="flex flex-wrap items-center gap-2 border-t border-rule px-5 py-3">
                <a href={replyHref(i)} className={studioButton.ink}>
                  <Mail className="size-4" aria-hidden /> Reply
                </a>
                {nextStatuses[i.status].map((n) => (
                  <form key={n.status} action={setInquiryStatusAction}>
                    <input type="hidden" name="id" value={i.id} />
                    <input type="hidden" name="status" value={n.status} />
                    <button className={studioButton.outline}>{n.label}</button>
                  </form>
                ))}
                <form action={deleteInquiryAction} className="ml-auto">
                  <input type="hidden" name="id" value={i.id} />
                  <ConfirmSubmit message={`Delete ${i.name}'s ${i.kind}? This can't be undone.`} className={cn(studioButton.ghost, "hover:text-destructive")}>
                    <Trash2 className="size-4" aria-hidden /> Delete
                  </ConfirmSubmit>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
