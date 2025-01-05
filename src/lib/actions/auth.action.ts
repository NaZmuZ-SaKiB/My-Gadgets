"use server";

import { authKey, backendUrl } from "@/constants";
import { TUser } from "@/types/user.type";
import { jwtHelpers } from "@/utils/jwtHelpers";
import { cookies } from "next/headers";
import { z } from "zod";
import { AuthValidation } from "../validations/auth.validation";

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

  (await cookies()).set(authKey, token, {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    path: "/",
  });

  return result;
};

export const changePassword = async (
  payload: z.infer<typeof AuthValidation.changePassword>,
) => {
  const response = await fetch(`${backendUrl}/api/auth/change-password`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: (await cookies()).get(authKey)?.value || "",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const result = await response.json();

  return result;
};

export const currentUser = async (): Promise<TUser | null> => {
  try {
    const jwt = (await cookies()).get(authKey);
    if (!jwt?.value) {
      return null;
    }

    const response = await fetch(`${backendUrl}/api/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies()).get(authKey)?.value || "",
      },
      cache: "no-store",
    });

    const result = await response.json();

    return result.data;
  } catch (error) {
    return null;
  }
};

export const isUserLoggedIn = async (): Promise<{
  _id: string;
  email: string;
  role: string;
} | null> => {
  try {
    const jwt = (await cookies()).get(authKey);
    if (!jwt?.value) {
      return null;
    }

    const decoded = (await jwtHelpers.verifyToken(
      jwt.value,
      process.env.JWT_SECRET as string,
    )) as unknown as { payload: any };

    return decoded.payload;
  } catch (error) {
    return null;
  }
};
