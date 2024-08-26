import { useMutation, useQuery } from "@tanstack/react-query";
import {
  categoryCreateAction,
  categoryGetAllAction,
  categoryGetByIdAction,
} from "../actions/category.action";
import { AQTags } from "@/constants/tags";

export const useCategoryCreateMutation = () =>
  useMutation({
    mutationFn: categoryCreateAction,
  });

export const useCategoryGetAllQuery = (params: string) =>
  useQuery({
    queryKey: [AQTags.CATEGORY, AQTags.ALL, params],
    queryFn: () => categoryGetAllAction(params),
  });

export const useCategoryGetByIdQuery = (id: string) =>
  useQuery({
    queryKey: [AQTags.CATEGORY, id],
    queryFn: () => categoryGetByIdAction(id),
  });
