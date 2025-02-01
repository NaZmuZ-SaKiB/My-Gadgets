"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { RangeSlider } from "@/components/ui/range-slider";

type TProps = {
  field: string;
  min: number;
  max: number;
  step?: number;
};

const RangeFilter = ({ field, min, max, step = 1 }: TProps) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const [values, setValues] = useState<number[]>([
    Number(searchParams.get(`min${field}`)) || min,
    Number(searchParams.get(`max${field}`)) || max,
  ]);

  const router = useRouter();

  const handleChange = (values: number[]) => {
    setValues(values);

    const params = new URLSearchParams(searchParams);
    params.delete("page");
    params.delete(`min${field}`);
    params.delete(`max${field}`);

    params.append("page", "1");
    params.append(`min${field}`, values[0].toString());
    params.append(`max${field}`, values[1].toString());
    setTimeout(() => {
      router.replace(`${pathName}?${params}`);
    }, 500);
  };

  return (
    <div className="rounded-xl border border-slate-200">
      <h3 className="border-b border-slate-200 px-3 py-2 text-lg font-semibold capitalize text-slate-700">
        {field}
      </h3>

      <div className="flex justify-between gap-3 px-3 pt-3 text-sm">
        <span className="flex-1 border border-slate-200 p-2">{values[0]}</span>
        <span className="flex-1 border border-slate-200 p-2">{values[1]}</span>
      </div>

      <div className="w-full px-3 pb-5 pt-5">
        <RangeSlider
          value={values}
          onValueChange={handleChange}
          min={min}
          max={max}
          step={step}
        />
      </div>
    </div>
  );
};

export default RangeFilter;
