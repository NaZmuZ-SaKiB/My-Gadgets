import { useMutation, useQuery } from "@tanstack/react-query";
import {
  branchCreateAction,
  branchGetAllAction,
  branchGetByIdAction,
  branchRemoveAction,
  branchUpdateAction,
} from "../actions/branch.action";
import { AQTags } from "@/constants";

export const useBrandCreateMutation = () =>
  useMutation({
    mutationFn: branchCreateAction,
  });

export const useBrandUpdateMutation = () =>
  useMutation({
    mutationFn: branchUpdateAction,
  });

export const useBrandGetAllQuery = (params: string) =>
  useQuery({
    queryKey: [AQTags.BRANCH, AQTags.ALL, params],
    queryFn: () => branchGetAllAction(params),
  });

export const useBrandGetByIdQuery = (id: string) =>
  useQuery({
    queryKey: [AQTags.BRANCH, id],
    queryFn: () => branchGetByIdAction(id),
  });

export const useBrandDeleteMutation = () =>
  useMutation({
    mutationFn: branchRemoveAction,
  });
