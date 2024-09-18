"use client";

import { useShippingAddressGetAllQuery } from "@/lib/queries/shippingAddress.query";
import { TShippingAddress } from "@/types/shippingAddress.type";
import AddShippingAddressModal from "./AddShippingAddressModal";

type TProps = {
  userId: string;
};

const ShippingAddressSection = ({ userId }: TProps) => {
  const { data, isLoading } = useShippingAddressGetAllQuery(`user=${userId}`);
  const addresses: TShippingAddress[] = data?.data || [];

  if (isLoading) return <p>Loading...</p>;
  return (
    <div className="sm:rounded-xl sm:border sm:border-slate-200 sm:p-4">
      <h2 className="text-lg font-semibold text-slate-700">Shipping Address</h2>

      <div>
        <AddShippingAddressModal />
      </div>
    </div>
  );
};

export default ShippingAddressSection;
