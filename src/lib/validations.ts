import { z } from "zod";

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
