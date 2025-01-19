"use client";

import { AQTags } from "@/constants";
import {
  useWishlistAddMutation,
  useWishlistGetQuery,
  useWishlistRemoveMutation,
} from "@/lib/queries/wishlist.query";
import { cn } from "@/lib/utils";
import { TProduct } from "@/types/product.type";
import { useQueryClient } from "@tanstack/react-query";
import { ClassValue } from "clsx";
import { Heart, Loader2 } from "lucide-react";
import { toast } from "sonner";

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
          exact: false,
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
        <Heart className="text-slate-300" />
      </div>
    );

  return (
    <div
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
        <div>{isAdded ? <Heart fill="#3AB77D" /> : <Heart />}</div>
      ) : (
        <Loader2
          className={"animate-spin text-slate-300 hover:text-slate-300"}
        />
      )}
    </div>
  );
};

export default WishlistButton;
