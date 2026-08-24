import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Enter your name."),
  email: z.string().trim().email("Enter a valid work email."),
  company: z.string().trim().min(1, "Enter your company."),
  role: z.string().trim().min(1, "Enter your role."),
  goal: z.string().trim().min(10, "Give a little more detail — a sentence or two is fine."),
  currentSituation: z.string().trim().optional(),
  projectSize: z.string().trim().optional(),
  preferredContact: z.enum(["email", "linkedin", "either"]).default("either"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
