"use client";

import { Input } from "@/components/ui/input";
import { paymentMethods } from "@/constants";
import { TPaymentMethod } from "@/types/order.type";

type TProps = {
  selectedPaymentMethod: TPaymentMethod;
  setSelectedPaymentMethod: (paymentMethod: TPaymentMethod) => void;
  setTransactionId: (transactionId: string) => void;
};

const PaymentMethodSection = ({
  selectedPaymentMethod,
  setSelectedPaymentMethod,
  setTransactionId,
}: TProps) => {
  return (
    <div className="sm:rounded-xl sm:border sm:border-slate-200 sm:p-4">
      <h2 className="text-lg font-semibold text-slate-700">Payment Method</h2>

      <div className="space-y-1.5 mt-5">
        {paymentMethods.map((method) => (
          <div
            key={method}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setSelectedPaymentMethod(method)}
          >
            <input
              type="radio"
              name="paymentMethod"
              id={method}
              checked={selectedPaymentMethod === method}
              onChange={() => setSelectedPaymentMethod(method)}
            />
            <label
              htmlFor={method}
              className="text-sm text-slate-700 capitalize cursor-pointer hover:text-primary"
            >
              {method.split("-").join(" ")}
            </label>
          </div>
        ))}

        {selectedPaymentMethod === "bank-transfer" && (
          <div>
            <p className="text-sm font-medium mb-1">Transaction ID</p>
            <Input
              onChange={(e) => setTransactionId(e.target.value)}
              className="no-focus"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentMethodSection;
