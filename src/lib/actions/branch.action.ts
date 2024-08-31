"use server";

import { authKey, backendUrl } from "@/constants";
import { cookies } from "next/headers";

export const branchCreateAction = async (payload: { name: string }) => {
  const response = await fetch(`${backendUrl}/api/branch`, {
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

export const branchUpdateAction = async ({
  id,
  payload,
}: {
  id: string;
  payload: {
    name?: string;
    image?: string;
  };
}) => {
  const response = await fetch(`${backendUrl}/api/branch/${id}`, {
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

export const branchGetAllAction = async (params: string) => {
  const response = await fetch(`${backendUrl}/api/branch?${params}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
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

export const branchGetByIdAction = async (id: string) => {
  const response = await fetch(`${backendUrl}/api/branch/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: cookies().get(authKey)?.value || "",
    },
    cache: "no-store",
  });

  const result = await response.json();

  return result;
};

export const branchRemoveAction = async (ids: string[]) => {
  const response = await fetch(`${backendUrl}/api/branch`, {
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
