import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createAdminAction,
  myProfileUpdateAction,
  userGetAllAction,
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

export const useUserGetAllQuery = (params: string) =>
  useQuery({
    queryKey: [AQTags.USER, AQTags.ALL, params],
    queryFn: () => userGetAllAction(params),
    refetchOnWindowFocus: "always",
    refetchOnMount: "always",
  });
