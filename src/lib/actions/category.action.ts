"use server";

import { authKey, backendUrl } from "@/constants";
import { cookies } from "next/headers";

export const categoryCreateAction = async (payload: {
  name: string;
  label: string;
}) => {
  const response = await fetch(`${backendUrl}/api/category`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: cookies().get(authKey)?.value || "",
    },
    body: JSON.stringify(payload),
    credentials: "include",
    cache: "no-store",
  });

  const result = await response.json();

  return result;
};
