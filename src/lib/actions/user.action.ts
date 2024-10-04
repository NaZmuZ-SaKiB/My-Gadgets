"use server";

import { authKey, backendUrl } from "@/constants";
import { TUser } from "@/types/user.type";
import { cookies } from "next/headers";

export const myProfileUpdateAction = async (payload: Partial<TUser>) => {
  const response = await fetch(`${backendUrl}/api/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: cookies().get(authKey)?.value || "",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const result = await response.json();

  return result;
};
