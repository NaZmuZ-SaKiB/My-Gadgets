"use server";

import { authKey, backendUrl } from "@/constants";
import { jwtHelpers } from "@/utils/jwtHelpers";
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

export const isUserLoggedIn = async (): Promise<{
  _id: string;
  email: string;
  role: string;
} | null> => {
  try {
    const jwt = cookies().get(authKey);
    if (!jwt?.value) {
      return null;
    }

    const decoded = (await jwtHelpers.verifyToken(
      jwt.value,
      process.env.JWT_SECRET as string
    )) as unknown as { payload: any };

    return decoded.payload;
  } catch (error) {
    return null;
  }
};
