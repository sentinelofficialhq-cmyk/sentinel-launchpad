import { z } from "zod";

export const waitlistSchema = z
  .object({
    email: z
      .string()
      .trim()
      .min(1, { message: "Email is required" })
      .email({ message: "Enter a valid email" })
      .max(255, { message: "Email is too long" }),
    phone: z
      .string()
      .trim()
      .max(20, { message: "Phone is too long" })
      .optional()
      .or(z.literal("")),
    smsConsent: z.boolean().optional().default(false),
  })
  .refine(
    (data) => {
      if (!data.phone) return true;
      // Loose international phone check: 7-15 digits, optional +, spaces, dashes, parens
      return /^\+?[\d\s().-]{7,20}$/.test(data.phone);
    },
    { message: "Enter a valid phone number", path: ["phone"] },
  )
  .refine(
    (data) => {
      // SMS consent only meaningful when phone is provided; never blocks submission
      if (data.smsConsent && !data.phone) return false;
      return true;
    },
    {
      message: "Add a phone number to receive SMS updates",
      path: ["smsConsent"],
    },
  );

export type WaitlistPayload = z.infer<typeof waitlistSchema>;

/**
 * Submit a waitlist signup.
 *
 * TODO: wire to Lovable Cloud / Supabase / API endpoint.
 * Replace this stub with e.g.:
 *   const { error } = await supabase.from("waitlist").insert(payload);
 *   if (error) throw error;
 */
export async function submitWaitlist(payload: WaitlistPayload): Promise<void> {
  // Simulate network latency so loading states are visible during dev.
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Intentionally minimal logging — no PII beyond what user submitted.
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.info("[waitlist] submitted", {
      email: payload.email,
      hasPhone: Boolean(payload.phone),
      smsConsent: Boolean(payload.smsConsent),
    });
  }
}
