import { z } from "zod";

const hexColor = z
  .string()
  .trim()
  .regex(/^#[0-9a-fA-F]{6}$/, "Enter a hex color like #1a2b3c.");

export const loginSchema = z.object({
  password: z.string().min(1, "Enter the password."),
});

export const siteSettingsSchema = z.object({
  colors: z.object({
    light: z.object({ background: hexColor, foreground: hexColor, brand: hexColor }),
    dark: z.object({ background: hexColor, foreground: hexColor, brand: hexColor }),
  }),
  hero: z.object({
    tagline: z.string().trim().min(1, "Add a tagline.").max(200),
    ctaLabel: z.string().trim().min(1, "Add a button label.").max(60),
  }),
  availability: z.object({
    status: z.enum(["open", "limited", "booked"]),
    note: z.string().trim().max(140),
  }),
});

export type SiteSettingsValues = z.infer<typeof siteSettingsSchema>;

export const postSchema = z.object({
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens only."),
  title: z.string().trim().min(3, "Give it a title."),
  date: z.string().trim().refine((v) => !Number.isNaN(Date.parse(v)), "Invalid date."),
  channel: z.enum(["technical", "business"]),
  excerpt: z.string().trim().min(10, "Add a short excerpt."),
  coverImage: z.string().trim().min(1, "Add a cover image."),
  coverImageAlt: z.string().trim().min(1, "Describe the cover image for alt text."),
  content: z.string().trim().min(20, "Write some content."),
  published: z.boolean(),
});

export type PostFormValues = z.infer<typeof postSchema>;

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Enter your name."),
  email: z.string().trim().email("Enter a valid email."),
  company: z.string().trim().optional(),
  message: z.string().trim().min(10, "Give a little more detail — a sentence or two is fine."),
  topic: z.string().trim().max(80).optional(),
  budget: z.string().trim().max(40).optional(),
  timeline: z.string().trim().max(40).optional(),
  // Hidden field real visitors never fill in; non-empty means a bot.
  website: z.string().trim().max(0, "").optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const bookingFormSchema = z.object({
  name: z.string().trim().min(2, "Enter your name."),
  email: z.string().trim().email("Enter a valid email."),
  company: z.string().trim().optional(),
  notes: z.string().trim().max(1000).optional(),
  topic: z.string().trim().max(80).optional(),
  slot: z.string().trim().refine((v) => !Number.isNaN(Date.parse(v)), "Invalid time slot."),
  // Hidden field real visitors never fill in; non-empty means a bot.
  website: z.string().trim().max(0, "").optional(),
});

export type BookingFormValues = z.infer<typeof bookingFormSchema>;
