import { useMutation } from "@tanstack/react-query";
import { signIn } from "../actions/auth.actions";

export const useSignInMutation = () =>
  useMutation({
    mutationFn: signIn,
  });
