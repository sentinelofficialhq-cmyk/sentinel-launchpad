import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js/cors";

const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

const jsonHeaders = {
  ...corsHeaders,
  "Content-Type": "application/json",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type WaitlistRequest = {
  email?: unknown;
  phone?: unknown;
  first_name?: unknown;
  sms_consent?: unknown;
  email_consent?: unknown;
  consent_text?: unknown;
  source?: unknown;
  utm_source?: unknown;
  utm_medium?: unknown;
  utm_campaign?: unknown;
  website?: unknown;
};

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: jsonHeaders,
  });
}

function normalizeEmail(value: unknown) {
  if (typeof value !== "string") {
    throw new Error("Email is required");
  }

  const normalized = value.trim().toLowerCase();
  if (!normalized) {
    throw new Error("Email is required");
  }

  if (!emailPattern.test(normalized)) {
    throw new Error("Enter a valid email");
  }

  return normalized;
}

function normalizeOptionalText(value: unknown) {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function normalizeUsPhone(value: unknown) {
  const phone = normalizeOptionalText(value);
  if (!phone) {
    return null;
  }

  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) {
    return `+1${digits}`;
  }

  if (digits.length === 11 && digits.startsWith("1")) {
    return `+${digits}`;
  }

  throw new Error("Enter a valid US phone number");
}

function normalizeBoolean(value: unknown, fallback = false) {
  return typeof value === "boolean" ? value : fallback;
}

async function sha256(value: string) {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(value),
  );

  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() ?? null;
  }

  return (
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-real-ip") ??
    null
  );
}

function getSupabaseAdmin() {
  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
  });
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (request.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    console.error("Missing required Supabase secrets");
    return jsonResponse({ error: "Server misconfiguration" }, 500);
  }

  try {
    const payload = (await request.json()) as WaitlistRequest;

    const honeypot = normalizeOptionalText(payload.website);
    if (honeypot) {
      return jsonResponse({ success: true });
    }

    const email = normalizeEmail(payload.email);
    const phone = normalizeUsPhone(payload.phone);
    const smsConsent = normalizeBoolean(payload.sms_consent, false);

    if (smsConsent && !phone) {
      return jsonResponse(
        { error: "Phone number is required when SMS consent is enabled" },
        400,
      );
    }

    const clientIp = getClientIp(request);
    const ipHash = clientIp ? await sha256(clientIp) : null;
    const supabaseAdmin = getSupabaseAdmin();

    const row = {
      email,
      phone,
      first_name: normalizeOptionalText(payload.first_name),
      sms_consent: smsConsent,
      email_consent: normalizeBoolean(payload.email_consent, true),
      consent_text: normalizeOptionalText(payload.consent_text),
      source: normalizeOptionalText(payload.source),
      utm_source: normalizeOptionalText(payload.utm_source),
      utm_medium: normalizeOptionalText(payload.utm_medium),
      utm_campaign: normalizeOptionalText(payload.utm_campaign),
      user_agent: normalizeOptionalText(request.headers.get("user-agent")),
      ip_hash: ipHash,
    };

    const { error } = await supabaseAdmin
      .from("waitlist_leads")
      .upsert(row, { onConflict: "email" });

    if (error) {
      console.error("Failed to upsert waitlist lead", error);
      return jsonResponse({ error: "Unable to submit waitlist request" }, 500);
    }

    return jsonResponse({ success: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Invalid request payload";
    return jsonResponse({ error: message }, 400);
  }
});
