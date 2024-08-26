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
    cache: "no-store",
  });

  const result = await response.json();

  return result;
};

export const categoryGetAllAction = async (params: string) => {
  const response = await fetch(`${backendUrl}/api/category?${params}`, {
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

export const categoryGetByIdAction = async (id: string) => {
  const response = await fetch(`${backendUrl}/api/category/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const result = await response.json();

  return result;
};
