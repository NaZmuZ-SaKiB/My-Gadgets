import { useMutation, useQuery } from "@tanstack/react-query";
import {
  orderCreateAction,
  orderGetAllAction,
  orderGetByIdAction,
  orderUpdateAction,
} from "../actions/order.action";
import { AQTags } from "@/constants";

export const useOrderCreateMutation = () =>
  useMutation({
    mutationFn: orderCreateAction,
  });

export const useOrderUpdateMutation = () =>
  useMutation({
    mutationFn: orderUpdateAction,
  });

export const useOrderGetAllQuery = (params: string) =>
  useQuery({
    queryKey: [AQTags.ORDER, AQTags.ALL, params],
    queryFn: () => orderGetAllAction(params),
  });

export const useOrderGetByIdQuery = (id: string) =>
  useQuery({
    queryKey: [AQTags.ORDER, id],
    queryFn: () => orderGetByIdAction(id),
  });
