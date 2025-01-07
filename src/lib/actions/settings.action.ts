"use server";

import { authKey, backendUrl } from "@/constants";
import { z } from "zod";
import { SettingsValidation } from "../validations/settings.validation";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export const settingsGetAction = async (type?: string) => {
  const response = await fetch(
    `${backendUrl}/api/settings?type=${type || "all"}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    },
  );

  const result = await response.json();

  return result;
};

export const settingsUpdateAction = async (
  payload: z.infer<typeof SettingsValidation.update>,
) => {
  const response = await fetch(`${backendUrl}/api/settings`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: (await cookies()).get(authKey)?.value || "",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const result = await response.json();

  revalidatePath("/");

  return result;
};
