"use client";

import { useShippingAddressGetAllQuery } from "@/lib/queries/shippingAddress.query";
import { TShippingAddress } from "@/types/shippingAddress.type";
import AddShippingAddressModal from "./AddShippingAddressModal";
import { RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type TProps = {
  userId: string;
  selectedAddress: string | null;
  setSelectedAddress: (address: string | null) => void;
};

const ShippingAddressSection = ({
  userId,
  selectedAddress,
  setSelectedAddress,
}: TProps) => {
  const { data, isLoading, refetch } = useShippingAddressGetAllQuery(
    `user=${userId}`
  );
  const addresses: TShippingAddress[] = data?.data || [];

  useEffect(() => {
    if (data?.data.length > 0) {
      const defaultAddress = data?.data.find(
        (address: TShippingAddress) => address.default
      );
      setSelectedAddress(defaultAddress!._id?.toString());
    }
  }, [data, setSelectedAddress]);

  if (isLoading) return <p>Loading...</p>;
  return (
    <div className="sm:rounded-xl sm:border sm:border-slate-200 sm:p-4">
      <div className="flex items-center justify-between gap-3 mb-3">
        <h2 className="text-lg font-semibold text-slate-700">
          Shipping Address
        </h2>
        <span
          className="flex items-center gap-2 text-slate-700 text-sm px-2 py-0.5 border border-slate-200 rounded cursor-pointer"
          onClick={() => refetch()}
        >
          <RefreshCcw className="size-4" /> <span>Refresh</span>
        </span>
      </div>

      <div className="space-y-3">
        {addresses.map((address) => (
          <div
            key={`${address?._id}`}
            className={cn(
              "border-2 border-slate-50 bg-slate-50 text-sm text-slate-700 p-2 cursor-pointer rounded-lg",
              {
                "border-primary/50":
                  selectedAddress === address?._id?.toString(),
              }
            )}
            onClick={() => setSelectedAddress(address?._id?.toString())}
          >
            <p>{address?.addressLine1}</p>
            {address?.addressLine2 && <p>{address?.addressLine2}</p>}
            <p>
              <span>City: {address.city}</span>
              {", "}
              <span>District: {address.district}</span>
            </p>
            <p>
              <span>Division: {address.division}</span>
              {", "}
              <span>Zip: {address.zipCode}</span>
            </p>
            <p>Phone: {address.phone}</p>
          </div>
        ))}

        <AddShippingAddressModal />
      </div>
    </div>
  );
};

export default ShippingAddressSection;
