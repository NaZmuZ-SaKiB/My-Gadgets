import { useMutation, useQuery } from "@tanstack/react-query";
import {
  changePassword,
  currentUser,
  isUserLoggedIn,
  signIn,
  signOut,
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
    queryKey: ["current_user"],
    queryFn: () => currentUser(),
  });

export const useIsUserLoggedInQuery = () =>
  useQuery({
    queryKey: ["is_user_logged_in"],
    queryFn: () => isUserLoggedIn(),
  });
