"use server";

import { authKey, backendUrl } from "@/constants";
import { TBrand } from "@/types/brand.type";
import { cookies } from "next/headers";

export const brandCreateAction = async (payload: { name: string }) => {
  const response = await fetch(`${backendUrl}/api/brand`, {
    method: "POST",
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

export const brandUpdateAction = async ({
  id,
  payload,
}: {
  id: string;
  payload: Partial<TBrand>;
}) => {
  const response = await fetch(`${backendUrl}/api/brand/${id}`, {
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

export const brandGetAllAction = async (params: string) => {
  const response = await fetch(`${backendUrl}/api/brand?${params}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: cookies().get(authKey)?.value || "",
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

export const brandGetByIdAction = async (id: string) => {
  const response = await fetch(`${backendUrl}/api/brand/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const result = await response.json();

  return result;
};

export const brandToggleFeaturedAction = async (id: string) => {
  const response = await fetch(`${backendUrl}/api/brand/${id}/featured`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: cookies().get(authKey)?.value || "",
    },
    cache: "no-store",
  });

  const result = await response.json();

  return result;
};

export const brandRemoveAction = async (ids: string[]) => {
  const response = await fetch(`${backendUrl}/api/brand`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: cookies().get(authKey)?.value || "",
    },
    body: JSON.stringify({ ids }),
    cache: "no-store",
  });

  const result = await response.json();

  return result;
};
