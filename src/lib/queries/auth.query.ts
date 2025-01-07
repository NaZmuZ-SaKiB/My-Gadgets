import { useMutation, useQuery } from "@tanstack/react-query";
import {
  changePassword,
  currentUser,
  isUserLoggedIn,
  signIn,
  signUp,
} from "../actions/auth.action";

export const useSignUpMutation = () =>
  useMutation({
    mutationFn: signUp,
  });

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
