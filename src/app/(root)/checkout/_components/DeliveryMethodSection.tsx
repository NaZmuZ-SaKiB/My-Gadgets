"use client";

import { deliveryOptions } from "@/constants";
import { TDeliveryOption } from "@/types/order.type";

type TProps = {
  selectedDeliveryMethod: TDeliveryOption;
  setSelectedDeliveryMethod: (paymentMethod: TDeliveryOption) => void;
};

const DeliveryMethodSection = ({
  selectedDeliveryMethod,
  setSelectedDeliveryMethod,
}: TProps) => {
  return (
    <div className="sm:rounded-xl sm:border sm:border-slate-200 sm:p-4">
      <h2 className="text-lg font-semibold text-slate-700">Delivery Option</h2>

      <div className="space-y-1.5 mt-5">
        {deliveryOptions.map((method) => (
          <div
            key={method}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setSelectedDeliveryMethod(method)}
          >
            <input
              type="radio"
              name="deliveryOption"
              id={method}
              checked={selectedDeliveryMethod === method}
              onChange={() => setSelectedDeliveryMethod(method)}
            />
            <label
              htmlFor={method}
              className="text-sm text-slate-700 capitalize cursor-pointer hover:text-primary"
            >
              {method.split("-").join(" ")}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeliveryMethodSection;
