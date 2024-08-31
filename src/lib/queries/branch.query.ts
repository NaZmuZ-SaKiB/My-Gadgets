import { useMutation, useQuery } from "@tanstack/react-query";
import {
  branchCreateAction,
  branchGetAllAction,
  branchGetByIdAction,
  branchRemoveAction,
  branchUpdateAction,
} from "../actions/branch.action";
import { AQTags } from "@/constants";

export const useBranchCreateMutation = () =>
  useMutation({
    mutationFn: branchCreateAction,
  });

export const useBranchUpdateMutation = () =>
  useMutation({
    mutationFn: branchUpdateAction,
  });

export const useBranchGetAllQuery = (params: string) =>
  useQuery({
    queryKey: [AQTags.BRANCH, AQTags.ALL, params],
    queryFn: () => branchGetAllAction(params),
  });

export const useBranchGetByIdQuery = (id: string) =>
  useQuery({
    queryKey: [AQTags.BRANCH, id],
    queryFn: () => branchGetByIdAction(id),
  });

export const useBranchDeleteMutation = () =>
  useMutation({
    mutationFn: branchRemoveAction,
  });
