import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createAdminAction,
  myProfileUpdateAction,
  userGetAllAction,
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

export const useUserGetAllQuery = (params: string) =>
  useQuery({
    queryKey: [AQTags.USER, AQTags.ALL, params],
    queryFn: () => userGetAllAction(params),
    refetchOnWindowFocus: "always",
    refetchOnMount: "always",
  });
