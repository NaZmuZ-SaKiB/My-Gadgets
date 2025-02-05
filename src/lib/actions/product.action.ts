"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

import { AQTags, authKey, backendUrl } from "@/constants";
import { ProductValidation } from "../validations/product.validation";

export const productCreateAction = async (
  payload: z.infer<typeof ProductValidation.create>,
) => {
  const response = await fetch(`${backendUrl}/api/product`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: (await cookies()).get(authKey)?.value || "",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const result = await response.json();
  revalidateTag(AQTags.PRODUCT + AQTags.ALL);

  return result;
};

export const productUpdateAction = async ({
  id,
  payload,
}: {
  id: string;
  payload: Partial<z.infer<typeof ProductValidation.create>>;
}) => {
  const response = await fetch(`${backendUrl}/api/product/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: (await cookies()).get(authKey)?.value || "",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const result = await response.json();
  revalidateTag(`product-${id}`);

  return result;
};

export const productGetAllAction = async (params: string) => {
  const response = await fetch(`${backendUrl}/api/product?${params}`, {
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

export const productGetByIdAction = async (id: string) => {
  const response = await fetch(`${backendUrl}/api/product/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const result = await response.json();

  return result;
};

export const productRemoveAction = async (ids: string[]) => {
  const response = await fetch(`${backendUrl}/api/product`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: (await cookies()).get(authKey)?.value || "",
    },
    body: JSON.stringify({ ids }),
    cache: "no-store",
  });

  const result = await response.json();

  revalidateTag(AQTags.PRODUCT + AQTags.ALL);

  return result;
};

export const productTopSellingAction = async () => {
  const response = await fetch(`${backendUrl}/api/product/top-selling`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const result = await response.json();

  return result;
};
