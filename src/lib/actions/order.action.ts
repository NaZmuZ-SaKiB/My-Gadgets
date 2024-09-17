import { z } from "zod";
import { OrderValidation } from "../validations/order.validation";
import { authKey, backendUrl } from "@/constants";
import { cookies } from "next/headers";

export const orderCreateAction = async (
  payload: z.infer<typeof OrderValidation.create>
) => {
  const response = await fetch(`${backendUrl}/api/order`, {
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

export const orderUpdateAction = async ({
  id,
  payload,
}: {
  id: string;
  payload: Partial<z.infer<typeof OrderValidation.create>>;
}) => {
  const response = await fetch(`${backendUrl}/api/order/${id}`, {
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

export const orderGetAllAction = async (params: string) => {
  const response = await fetch(`${backendUrl}/api/order?${params}`, {
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

export const orderGetByIdAction = async (id: string) => {
  const response = await fetch(`${backendUrl}/api/order/${id}`, {
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
