type EventParams = Record<string, string | number | boolean | undefined>;

export function initGa4(): void {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

  if (!measurementId) {
    return;
  }

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = (...args: unknown[]) => {
    window.dataLayer.push(args);
  };

  window.gtag("js", new Date());
  window.gtag("config", measurementId, { send_page_view: true });
}

export function trackEvent(eventName: string, params?: EventParams): void {
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params ?? {});
  }
}

export function trackPageView(path: string): void {
  if (typeof window.gtag === "function") {
    window.gtag("event", "page_view", {
      page_path: path,
    });
  }
}
