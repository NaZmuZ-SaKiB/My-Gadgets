"use client";

import BreadcrumbBar from "@/components/global/shared/Breadcrumb";
import ProductCardAddToCart from "@/components/global/shared/ProductCardAddToCart";
import { AQTags } from "@/constants";
import {
  useWishlistClearMutation,
  useWishlistGetQuery,
  useWishlistRemoveMutation,
} from "@/lib/queries/wishlist.query";
import { TProduct } from "@/types/product.type";
import { formatCurrency } from "@/utils/currencyFormat";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2, X } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

const WishlistPage = () => {
  const { data: wishlistData, isLoading } = useWishlistGetQuery();
  const wishlist: TProduct[] = wishlistData?.data?.products || [];

  const { mutateAsync: removeProduct, isPending: removePending } =
    useWishlistRemoveMutation();
  const { mutateAsync: clearWishlist, isPending: clearPending } =
    useWishlistClearMutation();

  const queryClient = useQueryClient();

  const handleClearAll = async () => {
    if (clearPending) return;
    if (wishlist.length === 0) return;

    try {
      const result = await clearWishlist();

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

  const handleRemove = async (productId: string) => {
    if (removePending) return;

    try {
      const result = await removeProduct(productId);

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

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="mg-container pt-4">
      <BreadcrumbBar items={[{ label: "Wishlist" }]} />

      {wishlist.length !== 0 ? (
        <div className="mt-4">
          <table className="primary-table table table-auto">
            <thead>
              <tr>
                <th
                  className="cursor-pointer hover:bg-primary-hover hover:text-slate-50"
                  onClick={handleClearAll}
                >
                  Clear
                </th>
                <th>Product</th>
                <th>Price</th>
                <th className="max-sm:hidden">Availability</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {wishlist.map((product) => (
                <tr key={`wishlist-${product.name}`}>
                  <td className="cursor-pointer hover:text-primary-hover">
                    {!removePending ? (
                      <X
                        className="mx-auto"
                        onClick={() => handleRemove(`${product._id}`)}
                      />
                    ) : (
                      <Loader2 className="mx-auto animate-spin" />
                    )}
                  </td>
                  <td>
                    <div className="flex flex-wrap items-center gap-2">
                      <Image
                        src={product.images[0].secureUrl}
                        alt={product.name}
                        width={50}
                        height={50}
                        className="object-contain object-center max-md:hidden"
                      />
                      <span>{product.name}</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-medium text-primary-hover">
                        {formatCurrency(product.salePrice)}
                      </span>
                      <span className="text-xs line-through">
                        {formatCurrency(product.regularPrice)}
                      </span>
                    </div>
                  </td>
                  <td className="max-sm:hidden">
                    {product.quantity > 0 ? "In Stock" : "Out of Stock"}
                  </td>
                  <td>
                    <ProductCardAddToCart product={product} size="sm" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-4 rounded-xl border border-slate-200 px-5 py-10">
          <p className="text-center text-3xl font-bold text-slate-400">
            No Products your Wishlist
          </p>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
