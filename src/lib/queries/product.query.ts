import { useMutation, useQuery } from "@tanstack/react-query";
import {
  productCreateAction,
  productGetAllAction,
  productGetByIdAction,
  productRemoveAction,
  productTopSellingAction,
  productUpdateAction,
} from "../actions/product.action";
import { AQTags } from "@/constants";

export const useProductCreateMutation = () =>
  useMutation({
    mutationFn: productCreateAction,
  });

export const useProductUpdateMutation = () =>
  useMutation({
    mutationFn: productUpdateAction,
  });

export const useProductGetAllQuery = (params: string) =>
  useQuery({
    queryKey: [AQTags.PRODUCT, AQTags.ALL, params],
    queryFn: () => productGetAllAction(params),
  });

export const useProductTopSellingQuery = () =>
  useQuery({
    queryKey: [AQTags.PRODUCT],
    queryFn: () => productTopSellingAction(),
  });

export const useProductGetByIdQuery = (id: string) =>
  useQuery({
    queryKey: [AQTags.PRODUCT, id],
    queryFn: () => productGetByIdAction(id),
  });

export const useProductDeleteMutation = () =>
  useMutation({
    mutationFn: productRemoveAction,
  });
