import { useMutation, useQuery } from "@tanstack/react-query";
import { isUserLoggedIn, signIn } from "../actions/auth.action";
import { AQTags } from "@/constants";

export const useSignInMutation = () =>
  useMutation({
    mutationFn: signIn,
  });

export const useIsUserLoggedInQuery = () =>
  useQuery({
    queryKey: [],
    queryFn: () => isUserLoggedIn(),
  });
