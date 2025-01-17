"use client";

import BreadcrumbBar from "@/components/global/shared/Breadcrumb";
import { useCompare } from "@/lib/providers/ContextProvider";
import { formatCurrency } from "@/utils/currencyFormat";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const ComparePage = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { compare, removeFromCompare } = useCompare();

  if (!mounted) return null;
  return (
    <div className="mg-container pt-4">
      <BreadcrumbBar items={[{ label: "Compare" }]} />

      <div className="mt-4 overflow-y-auto">
        <table className="primary-table table table-auto">
          <thead>
            <tr>
              <th className="text-left">
                <h3 className="mb-2 text-xl font-semibold">
                  Product Comparison
                </h3>
                <p className="text-slate-500">
                  Find and select products to see the differences and
                  similarities between them
                </p>
              </th>
              {compare.map((product) => (
                <th key={`compare-table-th-${product._id}`}>
                  <Image
                    src={product?.images?.[0].secureUrl}
                    alt={product?.model}
                    height={120}
                    width={120}
                    className="mx-auto aspect-square object-contain"
                  />

                  <Link href={`/products/${product.slug}/${product._id}`}>
                    <h3 className="mt-2 cursor-pointer font-semibold text-slate-700 underline-offset-2 hover:underline max-xs:text-sm">
                      {product?.name}
                    </h3>
                  </Link>

                  <div>
                    <span className="text-xl font-semibold text-primary">
                      {formatCurrency(product.salePrice)}
                    </span>
                    <span className="ml-2 text-slate-500 line-through">
                      {formatCurrency(product.regularPrice)}
                    </span>
                  </div>

                  <button
                    onClick={() => removeFromCompare(product._id)}
                    className="mt-2 text-slate-700 underline"
                  >
                    Remove
                  </button>
                </th>
              ))}
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
};

export default ComparePage;
