"use client";

import { useActionState, useState, useTransition } from "react";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { BlogPostRecord } from "@/lib/blog-store";
import { savePostAction, uploadCoverImageAction, type PostFormState, type UploadState } from "@/lib/admin-actions";

const initialState: PostFormState = { status: "idle" };
const initialUploadState: UploadState = {};

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-+|-+$)/g, "");
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving…" : "Save post"}
    </Button>
  );
}

export function PostForm({ post }: { post?: BlogPostRecord }) {
  const isEditing = Boolean(post);
  const [state, formAction] = useActionState(savePostAction, initialState);
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(isEditing);
  const [coverImage, setCoverImage] = useState(post?.coverImage ?? "");
  const [uploadState, setUploadState] = useState<UploadState>({});
  const [uploadPending, startUpload] = useTransition();

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
    <form action={formAction} className="mt-8 flex flex-col gap-5">
      {isEditing ? <input type="hidden" name="originalSlug" value={post!.slug} /> : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            defaultValue={post?.title}
            required
            onChange={(e) => {
              if (!slugTouched) setSlug(slugify(e.target.value));
            }}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            name="slug"
            value={slug}
            onChange={(e) => {
              setSlugTouched(true);
              setSlug(e.target.value);
            }}
            required
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="channel">Channel</Label>
          <select
            id="channel"
            name="channel"
            defaultValue={post?.channel ?? "technical"}
            className="h-8 rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <option value="technical">Technical</option>
            <option value="business">For Clients</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            name="date"
            type="date"
            defaultValue={post?.date ? post.date.slice(0, 10) : new Date().toISOString().slice(0, 10)}
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea id="excerpt" name="excerpt" rows={2} defaultValue={post?.excerpt} required />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="coverImage">Cover image URL</Label>
        <Input
          id="coverImage"
          name="coverImage"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
          required
        />
        <div className="flex items-center gap-3">
          <input
            type="file"
            accept="image/*"
            disabled={uploadPending}
            onChange={handleFileChange}
            className="text-xs text-muted-foreground"
          />
          {uploadPending ? <span className="text-xs text-muted-foreground">Uploading…</span> : null}
          {uploadState.url ? <span className="text-xs text-brand">Uploaded — URL filled in above.</span> : null}
        </div>
        {uploadState.error ? <p className="text-xs text-destructive">{uploadState.error}</p> : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="coverImageAlt">Cover image alt text</Label>
        <Input id="coverImageAlt" name="coverImageAlt" defaultValue={post?.coverImageAlt} required />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="content">Content (Markdown)</Label>
        <Textarea
          id="content"
          name="content"
          rows={20}
          defaultValue={post?.content}
          className="font-mono text-sm"
          required
        />
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="published"
          defaultChecked={post ? post.published : true}
          className="size-4"
        />
        Published
      </label>

      {state.status === "error" ? <p className="text-sm text-destructive">{state.message}</p> : null}

      <div>
        <SubmitButton />
      </div>
    </form>
  );
}
