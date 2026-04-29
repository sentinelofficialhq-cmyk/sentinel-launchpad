const STORAGE_KEY = "sentinel_waitlist_utm";

export type UtmParams = {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
};

function readUtmParams(searchParams: URLSearchParams): UtmParams {
  return {
    utm_source: searchParams.get("utm_source"),
    utm_medium: searchParams.get("utm_medium"),
    utm_campaign: searchParams.get("utm_campaign"),
  };
}

export function persistUtmParams() {
  if (typeof window === "undefined") {
    return;
  }

  const next = readUtmParams(new URLSearchParams(window.location.search));
  const hasAnyValue = Object.values(next).some(Boolean);

  if (!hasAnyValue) {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

export function getStoredUtmParams(): UtmParams {
  if (typeof window === "undefined") {
    return {
      utm_source: null,
      utm_medium: null,
      utm_campaign: null,
    };
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {
        utm_source: null,
        utm_medium: null,
        utm_campaign: null,
      };
    }

    const parsed = JSON.parse(raw) as Partial<UtmParams>;
    return {
      utm_source: parsed.utm_source ?? null,
      utm_medium: parsed.utm_medium ?? null,
      utm_campaign: parsed.utm_campaign ?? null,
    };
  } catch {
    return {
      utm_source: null,
      utm_medium: null,
      utm_campaign: null,
    };
  }
}
