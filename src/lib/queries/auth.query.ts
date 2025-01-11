import { useMutation, useQuery } from "@tanstack/react-query";
import {
  changePassword,
  currentUser,
  isUserLoggedIn,
  signIn,
  signOut,
  signUp,
} from "../actions/auth.action";
import { AQTags } from "@/constants";

export const useSignUpMutation = () =>
  useMutation({
    mutationFn: signUp,
  });

export const useSignInMutation = () =>
  useMutation({
    mutationFn: signIn,
  });

export const useSignOutMutation = () =>
  useMutation({
    mutationFn: signOut,
  });

export const useChangePasswordMutation = () =>
  useMutation({
    mutationFn: changePassword,
  });

export const useCurrentUserQuery = () =>
  useQuery({
    queryKey: [AQTags.CURRENT_USER],
    queryFn: () => currentUser(),
  });

export const useIsUserLoggedInQuery = () =>
  useQuery({
    queryKey: [AQTags.IS_USER_LOGGED_IN],
    queryFn: () => isUserLoggedIn(),
  });
