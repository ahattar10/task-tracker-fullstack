import { trackEvent } from "../analytics/ga4";
import { http, setAccessToken } from "./http";

export interface RegisterPayload {
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export async function registerUser(payload: RegisterPayload) {
  const response = await http.post("/auth/register", payload);
  trackEvent("user_registered", {
    method: "email_password",
  });
  return response.data;
}

export async function loginUser(payload: LoginPayload) {
  const response = await http.post<{ access_token: string; token_type: string }>(
    "/auth/login",
    payload,
  );

  setAccessToken(response.data.access_token);
  trackEvent("user_login", {
    method: "email_password",
  });

  return response.data;
}
