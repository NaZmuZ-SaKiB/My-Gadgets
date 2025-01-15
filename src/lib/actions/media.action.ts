"use server";

import { authKey, backendUrl } from "@/constants";
import { TMedia } from "@/types/media.type";
import { cookies } from "next/headers";

export const mediaCreateAction = async (payload: Partial<TMedia>) => {
  const response = await fetch(`${backendUrl}/api/media`, {
    method: "POST",
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

export const mediaUpdateAction = async ({
  id,
  payload,
}: {
  id: string;
  payload: Partial<TMedia>;
}) => {
  const response = await fetch(`${backendUrl}/api/media/${id}`, {
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

export const mediaGetAllAction = async (params: string) => {
  const response = await fetch(`${backendUrl}/api/media?${params}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: (await cookies()).get(authKey)?.value || "",
    },
    cache: "no-store",
  });

  const result = await response.json();

  if (!result?.success) {
    return {
      data: [],
      meta: {},
    };
  }

  return result;
};

export const mediaGetByIdAction = async (id: string) => {
  const response = await fetch(`${backendUrl}/api/media/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: (await cookies()).get(authKey)?.value || "",
    },
    cache: "no-store",
  });

  const result = await response.json();

  return result;
};

export const mediaRemoveAction = async (ids: string[]) => {
  const response = await fetch(`${backendUrl}/api/media`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: (await cookies()).get(authKey)?.value || "",
    },
    body: JSON.stringify({ ids }),
    cache: "no-store",
  });

  const result = await response.json();

  return result;
};
