import { AQTags } from "@/constants";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  wishlistAddAction,
  wishlistClearAction,
  wishlistGetAction,
  wishlistRemoveAction,
} from "../actions/wishlist.action";

export const useWishlistGetQuery = () =>
  useQuery({
    queryKey: [AQTags.WISHLIST],
    queryFn: wishlistGetAction,
  });

export const useWishlistAddMutation = () =>
  useMutation({
    mutationFn: wishlistAddAction,
  });

export const useWishlistRemoveMutation = () =>
  useMutation({
    mutationFn: wishlistRemoveAction,
  });

export const useWishlistClearMutation = () =>
  useMutation({
    mutationFn: wishlistClearAction,
  });
