"use server";

import { authKey, backendUrl } from "@/constants";
import { TReview } from "@/types/review.type";
import { cookies } from "next/headers";
import { z } from "zod";
import { ReviewValidation } from "../validations/review.validation";

export const reviewCreateAction = async (
  payload: z.infer<typeof ReviewValidation.create>,
) => {
  const response = await fetch(`${backendUrl}/api/review`, {
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

export const reviewUpdateAction = async ({
  id,
  payload,
}: {
  id: string;
  payload: Partial<TReview>;
}) => {
  const response = await fetch(`${backendUrl}/api/review/${id}`, {
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

export const reviewGetAllAction = async (params: string) => {
  const response = await fetch(`${backendUrl}/api/review?${params}`, {
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

export const reviewGetAllByProductIdAction = async (productId: string) => {
  const response = await fetch(
    `${backendUrl}/api/review/product/${productId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    },
  );

  const result = await response.json();

  if (!result?.success) {
    return {
      data: [],
    };
  }

  return result;
};

export const reviewGetByIdAction = async (id: string) => {
  const response = await fetch(`${backendUrl}/api/review/${id}`, {
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

export const reviewRemoveAction = async (id: string) => {
  const response = await fetch(`${backendUrl}/api/review/${id}`, {
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
