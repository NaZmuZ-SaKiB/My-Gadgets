"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

import ComparePageLoading from "./loading";
import BreadcrumbBar from "@/components/global/shared/Breadcrumb";

import { formatCurrency } from "@/utils/currencyFormat";
import { useCompare } from "@/lib/providers/ContextProvider";

const compareFields = [
  {
    label: "Model",
    key: "model",
  },
  {
    label: "Brand",
    key: "brand.name",
  },
  {
    label: "Operating System",
    key: "operatingSystem",
  },
  {
    label: "Connectivity",
    key: "connectivity",
  },
  {
    label: "Charging Port",
    key: "chargingPort",
  },
  {
    label: "Weight",
    key: "weight",
  },
  {
    label: "Power Source",
    key: "powerSource",
  },
  {
    label: "Camera",
    key: "camera",
  },
  {
    label: "Display Size",
    key: "displaySize",
  },
  {
    label: "Compatibility",
    key: "compatibility",
  },
];

const ComparePage = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { compare, removeFromCompare } = useCompare();

  if (!mounted) return <ComparePageLoading />;
  return (
    <div className="mg-container pt-4">
      <BreadcrumbBar items={[{ label: "Compare" }]} />

      {compare.length !== 0 ? (
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
            <tbody>
              {compareFields.map((field) => (
                <tr key={`compare-table-tr-${field.key}`}>
                  <td>{field.label}</td>
                  {compare.map((product) => (
                    <td key={`compare-table-td-${product._id}-${field.key}`}>
                      {field.label !== "Brand"
                        ? (product as any)[field.key]?.toString()
                        : product.brand.name}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-4 rounded-xl border border-slate-200 px-5 py-10">
          <p className="text-center text-3xl font-bold text-slate-400">
            No Products in Compare
          </p>
        </div>
      )}
    </div>
  );
};

export default ComparePage;
