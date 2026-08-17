import { z } from "zod";

export const landingFormSchema = z
  .object({
    fullName: z.string().trim().min(2, "אנא הזינו שם מלא."),
    email: z
      .string()
      .trim()
      .min(1, "אנא הזינו כתובת אימייל.")
      .pipe(z.email("כתובת האימייל אינה תקינה.")),
    phone: z
      .string()
      .trim()
      .regex(/^[\d\s+()-]*$/, "מספר טלפון תקין מכיל ספרות בלבד."),
    message: z
      .string()
      .trim()
      .min(5, "ספרו לנו קצת יותר (לפחות 5 תווים)."),
    preferCall: z.boolean(),
  })
  .refine((data) => !data.preferCall || data.phone.length >= 9, {
    message: "אנא הזינו מספר טלפון כדי שנוכל להתקשר אליכם.",
    path: ["phone"],
  });

export type LandingFormValues = z.infer<typeof landingFormSchema>;
