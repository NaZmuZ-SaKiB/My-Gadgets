"use server";

import { authKey, backendUrl } from "@/constants";
import { cookies } from "next/headers";

export const wishlistGetAction = async () => {
  const response = await fetch(`${backendUrl}/api/wishlist`, {
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

export const wishlistAddAction = async (productId: string) => {
  const response = await fetch(`${backendUrl}/api/wishlist/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: (await cookies()).get(authKey)?.value || "",
    },
    cache: "no-store",
  });

  const result = await response.json();

  return result;
};

export const wishlistRemoveAction = async (productId: string) => {
  const response = await fetch(`${backendUrl}/api/wishlist/${productId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: (await cookies()).get(authKey)?.value || "",
    },
    cache: "no-store",
  });

  const result = await response.json();

  return result;
};

export const wishlistClearAction = async () => {
  const response = await fetch(`${backendUrl}/api/wishlist`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: (await cookies()).get(authKey)?.value || "",
    },
    cache: "no-store",
  });

  const result = await response.json();

  return result;
};
