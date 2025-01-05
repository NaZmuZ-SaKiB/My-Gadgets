import { useMutation, useQuery } from "@tanstack/react-query";
import {
  changePassword,
  currentUser,
  isUserLoggedIn,
  signIn,
} from "../actions/auth.action";

export const useSignInMutation = () =>
  useMutation({
    mutationFn: signIn,
  });

export const useChangePasswordMutation = () =>
  useMutation({
    mutationFn: changePassword,
  });

export const useCurrentUserQuery = () =>
  useQuery({
    queryKey: [],
    queryFn: () => currentUser(),
  });

export const useIsUserLoggedInQuery = () =>
  useQuery({
    queryKey: [],
    queryFn: () => isUserLoggedIn(),
  });
