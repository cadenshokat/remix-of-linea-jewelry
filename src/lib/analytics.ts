type Props = Record<string, any>;

function ra(): any | null {
  const w = window as any;
  return w?.rudderanalytics && typeof w.rudderanalytics.track === "function"
    ? w.rudderanalytics
    : null;
}

export function track(event: string, properties: Props = {}) {
  const r = ra();
  if (!r) return;
  r.track(event, {
    ...properties,
    path: window.location.pathname,
    url: window.location.href,
    referrer: document.referrer || undefined,
  });
}

export function page(properties: Props = {}) {
  const r = ra();
  if (!r) return;
  r.page(properties);
}
