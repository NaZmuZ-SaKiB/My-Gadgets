import { useMutation } from "@tanstack/react-query";
import { signIn } from "../actions/auth.action";

export const useSignInMutation = () =>
  useMutation({
    mutationFn: signIn,
  });
