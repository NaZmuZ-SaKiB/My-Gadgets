import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createAdminAction,
  myProfileUpdateAction,
  userGetAllAction,
  userGetByIdAction,
  userRoleToggleAction,
} from "../actions/user.action";
import { AQTags } from "@/constants";

export const useCreateAdminMutation = () =>
  useMutation({
    mutationFn: createAdminAction,
  });

export const useMyProfileUpdateMutation = () =>
  useMutation({
    mutationFn: myProfileUpdateAction,
  });

export const useUserRoleToggleMutation = () =>
  useMutation({
    mutationFn: userRoleToggleAction,
  });

export const useUserGetByIdQuery = (userId: string) =>
  useQuery({
    queryKey: [AQTags.USER, userId],
    queryFn: () => userGetByIdAction(userId),
  });

export const useUserGetAllQuery = (params: string) =>
  useQuery({
    queryKey: [AQTags.USER, AQTags.ALL, params],
    queryFn: () => userGetAllAction(params),
    refetchOnWindowFocus: "always",
    refetchOnMount: "always",
  });
