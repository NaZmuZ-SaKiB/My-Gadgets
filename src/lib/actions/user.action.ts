"use server";

import { authKey, backendUrl } from "@/constants";
import { TUser } from "@/types/user.type";
import { cookies } from "next/headers";

export const createAdminAction = async (payload: {
  email: string;
  password: string;
  name: string;
}) => {
  const response = await fetch(`${backendUrl}/api/user/create-admin`, {
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

export const myProfileUpdateAction = async (payload: Partial<TUser>) => {
  const response = await fetch(`${backendUrl}/api/user`, {
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

export const userGetByIdAction = async (userId: string) => {
  const response = await fetch(`${backendUrl}/api/user/${userId}`, {
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

export const userGetAllAction = async (params: string) => {
  const response = await fetch(`${backendUrl}/api/user?${params}`, {
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

export const userRoleToggleAction = async (payload: Partial<TUser>) => {
  const response = await fetch(`${backendUrl}/api/user/role-toggle`, {
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
