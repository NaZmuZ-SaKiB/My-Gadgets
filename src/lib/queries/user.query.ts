import { useMutation } from "@tanstack/react-query";
import {
  createAdminAction,
  myProfileUpdateAction,
} from "../actions/user.action";

export const useCreateAdminMutation = () =>
  useMutation({
    mutationFn: createAdminAction,
  });

export const useMyProfileUpdateMutation = () =>
  useMutation({
    mutationFn: myProfileUpdateAction,
  });
