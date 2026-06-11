import axios from "axios";
import { trackEvent } from "../analytics/ga4";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api";

export const http = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const TOKEN_KEY = "task_tracker_access_token";

export function getAccessToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setAccessToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearAccessToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

function isAuthEndpoint(url?: string): boolean {
  if (!url) {
    return false;
  }
  return url.includes("/auth/login") || url.includes("/auth/register");
}

let handlingSessionExpiry = false;

http.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const requestUrl = error?.config?.url as string | undefined;

    // Handle expired/invalid token globally for protected API requests.
    if (status === 401 && !isAuthEndpoint(requestUrl)) {
      clearAccessToken();

      if (!handlingSessionExpiry) {
        handlingSessionExpiry = true;
        sessionStorage.setItem("task_tracker_session_expired", "1");
        trackEvent("session_expired", {
          source: "http_401",
        });
        window.location.assign("/login?reason=session_expired");
      }
    }

    return Promise.reject(error);
  },
);
