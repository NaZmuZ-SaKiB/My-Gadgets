import { useMutation, useQuery } from "@tanstack/react-query";
import {
  categoryCreateAction,
  categoryGetAllAction,
  categoryGetAllWithSubCatsAction,
  categoryGetByIdAction,
  categoryRemoveAction,
  categoryToggleFeaturedAction,
  categoryToggleShowOnTopMenuAction,
  categoryUpdateAction,
} from "../actions/category.action";
import { AQTags } from "@/constants/tags";

export const useCategoryCreateMutation = () =>
  useMutation({
    mutationFn: categoryCreateAction,
  });

export const useCategoryUpdateMutation = () =>
  useMutation({
    mutationFn: categoryUpdateAction,
  });

export const useCategoryGetAllQuery = (params: string) =>
  useQuery({
    queryKey: [AQTags.CATEGORY, AQTags.ALL, params],
    queryFn: () => categoryGetAllAction(params),
  });

export const useCategoryGetAllWithSubCatQuery = () =>
  useQuery({
    queryKey: [AQTags.CATEGORY, AQTags.ALL, "with-sub-cats"],
    queryFn: () => categoryGetAllWithSubCatsAction(),
  });

export const useCategoryGetByIdQuery = (id: string) =>
  useQuery({
    queryKey: [AQTags.CATEGORY, id],
    queryFn: () => categoryGetByIdAction(id),
  });

export const useCategoryToggleFeaturedMutation = () =>
  useMutation({
    mutationFn: categoryToggleFeaturedAction,
  });

export const useCategoryToggleShowOnTopMenuMutation = () =>
  useMutation({
    mutationFn: categoryToggleShowOnTopMenuAction,
  });

export const useCategoryDeleteMutation = () =>
  useMutation({
    mutationFn: categoryRemoveAction,
  });
