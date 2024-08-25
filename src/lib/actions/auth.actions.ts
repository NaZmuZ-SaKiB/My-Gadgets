"use server";

import { authKey, backendUrl, USER_ROLE } from "@/constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
    return null;
  }

  const { token, user } = result?.data;

  cookies().set(authKey, token, {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    path: "/",
    sameSite: "none",
  });

  if (user?.role === USER_ROLE.USER) {
    redirect("/");
  } else {
    redirect("/admin");
  }
};
