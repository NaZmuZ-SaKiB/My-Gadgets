import { useMutation } from "@tanstack/react-query";
import { myProfileUpdateAction } from "../actions/user.action";

export const useMyProfileUpdateMutation = () =>
  useMutation({
    mutationFn: myProfileUpdateAction,
  });
