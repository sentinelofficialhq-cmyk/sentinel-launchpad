import { z } from "zod";
import { getStoredUtmParams } from "@/lib/utm";

const CONSENT_TEXT =
  "By joining, you agree to receive email updates from Sentinel. If you enter your phone number and opt into SMS, you agree to receive launch updates by text. Msg & data rates may apply. Reply STOP to unsubscribe.";

function normalizeUsPhone(value?: string) {
  const trimmed = value?.trim() ?? "";
  if (!trimmed) {
    return "";
  }

  const digits = trimmed.replace(/\D/g, "");
  if (digits.length === 10) {
    return `+1${digits}`;
  }

  if (digits.length === 11 && digits.startsWith("1")) {
    return `+${digits}`;
  }

  return null;
}

export const waitlistSchema = z
  .object({
    firstName: z.string().trim().max(100, { message: "First name is too long" }).optional(),
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
    website: z.string().max(255).optional().default(""),
    smsConsent: z.boolean().optional().default(false),
  })
  .refine(
    (data) => {
      if (!data.phone) return true;
      return normalizeUsPhone(data.phone) !== null;
    },
    { message: "Enter a valid US phone number", path: ["phone"] },
  )
  .refine(
    (data) => {
      if (data.smsConsent && !data.phone) return false;
      return true;
    },
    {
      message: "Add a phone number to receive SMS updates",
      path: ["smsConsent"],
    },
  );

export type WaitlistPayload = z.infer<typeof waitlistSchema>;

type WaitlistFunctionPayload = {
  email: string;
  phone?: string;
  first_name?: string;
  sms_consent: boolean;
  email_consent: true;
  consent_text: string;
  source: "sentinel_launchpad";
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  website: string;
};

export async function submitWaitlist(payload: WaitlistPayload): Promise<void> {
  const functionUrl = import.meta.env.VITE_SUPABASE_FUNCTION_URL;
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!functionUrl || !anonKey) {
    throw new Error("Waitlist signup is not configured");
  }

  const normalizedPhone = normalizeUsPhone(payload.phone);
  if (payload.phone && normalizedPhone === null) {
    throw new Error("Enter a valid US phone number");
  }

  const utm = getStoredUtmParams();
  const requestBody: WaitlistFunctionPayload = {
    email: payload.email.trim(),
    sms_consent: Boolean(payload.smsConsent),
    email_consent: true,
    consent_text: CONSENT_TEXT,
    source: "sentinel_launchpad",
    utm_source: utm.utm_source,
    utm_medium: utm.utm_medium,
    utm_campaign: utm.utm_campaign,
    website: payload.website?.trim() ?? "",
  };

  if (normalizedPhone) {
    requestBody.phone = normalizedPhone;
  }

  if (payload.firstName?.trim()) {
    requestBody.first_name = payload.firstName.trim();
  }

  const response = await fetch(functionUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`,
    },
    body: JSON.stringify(requestBody),
  });

  let responseBody: { error?: string } | null = null;

  try {
    responseBody = (await response.json()) as { error?: string };
  } catch {
    responseBody = null;
  }

  if (!response.ok) {
    throw new Error(responseBody?.error ?? "Please try again in a moment.");
  }
}
