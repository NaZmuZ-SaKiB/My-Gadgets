"use client";

import { toast } from "sonner";
import { ClassValue } from "clsx";
import { Heart, Loader2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

import {
  useWishlistAddMutation,
  useWishlistGetQuery,
  useWishlistRemoveMutation,
} from "@/lib/queries/wishlist.query";
import { AQTags } from "@/constants";
import { cn } from "@/lib/utils";

import { TProduct } from "@/types/product.type";

type TProps = {
  productId: string;
  className?: ClassValue;
};

const WishlistButton = ({ productId, className }: TProps) => {
  const { data: wishlistData, isLoading } = useWishlistGetQuery();
  const wishlist: TProduct[] = wishlistData?.data?.products || [];

  const { mutateAsync: addToWishlist, isPending: addPending } =
    useWishlistAddMutation();

  const { mutateAsync: removeFromWishlist, isPending: removePending } =
    useWishlistRemoveMutation();

  const isPending = addPending || removePending;

  const queryClient = useQueryClient();

  const isAdded = !!wishlist.find((item) => `${item._id}` === productId);

  const handleClick = async () => {
    if (addPending) return;

    try {
      let result;
      if (isAdded) {
        result = await removeFromWishlist(productId);
      } else {
        result = await addToWishlist(productId);
      }

      if (result?.success) {
        toast.success(result?.message);

        queryClient.invalidateQueries({
          queryKey: [AQTags.WISHLIST],
        });
      } else {
        toast.error(result?.message || "A server error occurred.");
      }
    } catch (error: any) {
      toast.error(error?.message || "A client error occurred.");
    }
  };

  if (isLoading)
    return (
      <div className={cn("cursor-pointer", className)}>
        <div>
          <Heart className="text-slate-300" />
        </div>
      </div>
    );

  return (
    <div
      suppressHydrationWarning
      onClick={handleClick}
      className={cn(
        "cursor-pointer",
        {
          "!text-primary hover:!text-primary": isAdded,
        },
        className,
      )}
    >
      {!isPending ? (
        <div suppressHydrationWarning>
          {isAdded ? (
            <Heart fill="#3AB77D" suppressHydrationWarning />
          ) : (
            <Heart suppressHydrationWarning />
          )}
        </div>
      ) : (
        <Loader2
          suppressHydrationWarning
          className={"animate-spin text-slate-300 hover:text-slate-300"}
        />
      )}
    </div>
  );
};

export default WishlistButton;
