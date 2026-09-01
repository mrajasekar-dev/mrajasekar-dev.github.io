import { z } from "zod";

const hexColor = z
  .string()
  .trim()
  .regex(/^#[0-9a-fA-F]{6}$/, "Enter a hex color like #1a2b3c.");

export const siteSettingsSchema = z.object({
  colors: z.object({
    light: z.object({ background: hexColor, foreground: hexColor, brand: hexColor }),
    dark: z.object({ background: hexColor, foreground: hexColor, brand: hexColor }),
  }),
  hero: z.object({
    tagline: z.string().trim().min(1, "Add a tagline.").max(200),
    ctaLabel: z.string().trim().min(1, "Add a button label.").max(60),
  }),
});

export type SiteSettingsValues = z.infer<typeof siteSettingsSchema>;

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Enter your name."),
  email: z.string().trim().email("Enter a valid work email."),
  company: z.string().trim().min(1, "Enter your company."),
  message: z.string().trim().min(10, "Give a little more detail — a sentence or two is fine."),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const bookingFormSchema = z.object({
  name: z.string().trim().min(2, "Enter your name."),
  email: z.string().trim().email("Enter a valid work email."),
  company: z.string().trim().min(1, "Enter your company."),
  notes: z.string().trim().max(1000).optional(),
  slot: z.string().trim().refine((v) => !Number.isNaN(Date.parse(v)), "Invalid time slot."),
  // Hidden field real visitors never fill in; non-empty means a bot.
  website: z.string().trim().max(0, "").optional(),
});

export type BookingFormValues = z.infer<typeof bookingFormSchema>;
