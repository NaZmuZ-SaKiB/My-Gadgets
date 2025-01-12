"use server";

import { AQTags, authKey, backendUrl } from "@/constants";
import { cookies } from "next/headers";
import { z } from "zod";
import { ProductValidation } from "../validations/product.validation";
import { revalidateTag } from "next/cache";

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
  revalidateTag(AQTags.PRODUCT + id);
  revalidateTag(AQTags.PRODUCT + AQTags.ALL);

  return result;
};

export const productGetAllAction = async (params: string) => {
  const response = await fetch(`${backendUrl}/api/product?${params}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
    next: {
      tags: [AQTags.PRODUCT + AQTags.ALL + params, AQTags.PRODUCT + AQTags.ALL],
    },
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
    next: {
      tags: [AQTags.PRODUCT + id],
    },
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
