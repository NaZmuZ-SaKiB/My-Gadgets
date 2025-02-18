"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import { ShippingAddressValidation } from "../validations/shippingAddress.validation";
import { TShippingAddress } from "@/types/shippingAddress.type";
import { authKey, backendUrl } from "@/constants";

export const shippingAddressCreateAction = async (
  payload: z.infer<typeof ShippingAddressValidation.create>,
) => {
  const response = await fetch(`${backendUrl}/api/shipping-address`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: (await cookies()).get(authKey)?.value || "",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const result = await response.json();

  revalidatePath("/account/addresses");

  return result;
};

export const shippingAddressUpdateAction = async ({
  id,
  payload,
}: {
  id: string;
  payload: Partial<TShippingAddress>;
}) => {
  const response = await fetch(`${backendUrl}/api/shipping-address/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: (await cookies()).get(authKey)?.value || "",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  revalidatePath("/account/addresses");

  const result = await response.json();

  return result;
};

export const shippingAddressGetAllAction = async (params: string) => {
  const response = await fetch(`${backendUrl}/api/shipping-address?${params}`, {
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

export const shippingAddressGetByIdAction = async (id: string) => {
  const response = await fetch(`${backendUrl}/api/shipping-address/${id}`, {
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

export const shippingAddressDeleteAction = async (id: string) => {
  const response = await fetch(`${backendUrl}/api/shipping-address/${id}`, {
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
