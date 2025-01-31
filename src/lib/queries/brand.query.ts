import { useMutation, useQuery } from "@tanstack/react-query";
import {
  brandCreateAction,
  brandGetAllAction,
  brandGetByIdAction,
  brandRemoveAction,
  brandUpdateAction,
} from "../actions/brand.action";
import { AQTags } from "@/constants";

export const useBrandCreateMutation = () =>
  useMutation({
    mutationFn: brandCreateAction,
  });

export const useBrandUpdateMutation = () =>
  useMutation({
    mutationFn: brandUpdateAction,
  });

export const useBrandGetAllQuery = (params: string) =>
  useQuery({
    queryKey: [AQTags.BRAND, AQTags.ALL, params],
    queryFn: () => brandGetAllAction(params),
  });

export const useBrandGetByIdQuery = (id: string) =>
  useQuery({
    queryKey: [AQTags.BRAND, id],
    queryFn: () => brandGetByIdAction(id),
  });

export const useBrandDeleteMutation = () =>
  useMutation({
    mutationFn: brandRemoveAction,
  });
