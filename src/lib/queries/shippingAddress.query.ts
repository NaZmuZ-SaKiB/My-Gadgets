import { useMutation, useQuery } from "@tanstack/react-query";
import {
  shippingAddressCreateAction,
  shippingAddressDeleteAction,
  shippingAddressGetAllAction,
  shippingAddressGetByIdAction,
  shippingAddressUpdateAction,
} from "../actions/shippingAddress.action";
import { AQTags } from "@/constants";

export const useShippingAddressCreateMutation = () =>
  useMutation({
    mutationFn: shippingAddressCreateAction,
  });

export const useShippingAddressUpdateMutation = () =>
  useMutation({
    mutationFn: shippingAddressUpdateAction,
  });

export const useShippingAddressGetAllQuery = (params: string) =>
  useQuery({
    queryKey: [AQTags.SHIPPING_ADDRESS, AQTags.ALL, params],
    queryFn: () => shippingAddressGetAllAction(params),
  });

export const useShippingAddressGetByIdQuery = (id: string) =>
  useQuery({
    queryKey: [AQTags.SHIPPING_ADDRESS, id],
    queryFn: () => shippingAddressGetByIdAction(id),
  });

export const useShippingAddressDeleteMutation = () =>
  useMutation({
    mutationFn: shippingAddressDeleteAction,
  });
