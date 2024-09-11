"use client";

import { RangeSlider } from "@/components/ui/range-slider";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

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
    params.delete(`min${field}`);
    params.delete(`max${field}`);

    params.append(`min${field}`, values[0].toString());
    params.append(`max${field}`, values[1].toString());
    setTimeout(() => {
      router.replace(`${pathName}?${params}`);
    }, 500);
  };

  return (
    <div className="rounded-xl border border-slate-200">
      <h3 className="font-semibold text-slate-700 text-lg px-3 py-2 border-b border-slate-200 capitalize">
        {field}
      </h3>

      <div className="flex justify-between gap-3 text-sm px-3 pt-3">
        <span className="flex-1 p-2 border border-slate-200">{values[0]}</span>
        <span className="flex-1 p-2 border border-slate-200">{values[1]}</span>
      </div>

      <div className="pt-5 pb-5 px-3 w-full">
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
