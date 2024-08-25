"use server";

import { authKey, backendUrl } from "@/constants";
import { cookies } from "next/headers";

export const signIn = async (payload: { email: string; password: string }) => {
  const response = await fetch(`${backendUrl}/api/auth/sign-in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const result = await response.json();

  if (!result.success) {
    return result;
  }

  const { token } = result?.data;

  cookies().set(authKey, token, {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    path: "/",
  });

  return result;
};
