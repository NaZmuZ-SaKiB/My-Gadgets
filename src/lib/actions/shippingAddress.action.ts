"use server";

import { z } from "zod";
import { ShippingAddressValidation } from "../validations/shippingAddress.validation";
import { authKey, backendUrl } from "@/constants";
import { cookies } from "next/headers";

export const shippingAddressCreateAction = async (
  payload: z.infer<typeof ShippingAddressValidation.create>
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

  return result;
};

export const shippingAddressUpdateAction = async ({
  id,
  payload,
}: {
  id: string;
  payload: Partial<z.infer<typeof ShippingAddressValidation.create>>;
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
