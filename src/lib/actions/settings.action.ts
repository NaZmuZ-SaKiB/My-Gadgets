"use server";

import { authKey, backendUrl } from "@/constants";
import { z } from "zod";
import { SettingsValidation } from "../validations/settings.validation";
import { cookies } from "next/headers";

export const settingsGetAction = async () => {
  const response = await fetch(`${backendUrl}/api/settings`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const result = await response.json();

  return result;
};

export const settingsUpdateAction = async (
  payload: z.infer<typeof SettingsValidation.update>
) => {
  const response = await fetch(`${backendUrl}/api/settings`, {
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
