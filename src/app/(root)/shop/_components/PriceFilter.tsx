"use client";

import { RangeSlider } from "@/components/ui/range-slider";
import { useState } from "react";

const PriceFilter = () => {
  const [values, setValues] = useState<number[]>([0, 300000]);

  return (
    <div className="rounded-xl border border-slate-300">
      <h3 className="font-bold text-lg px-3 py-2 border-b border-slate-300">
        Price
      </h3>

      <div className="flex justify-between gap-3 text-sm px-3 pt-3">
        <span className="flex-1 p-2 border border-slate-300">{values[0]}</span>
        <span className="flex-1 p-2 border border-slate-300">{values[1]}</span>
      </div>

      <div className="pt-5 pb-5 px-3 w-full">
        <RangeSlider
          value={values}
          onValueChange={setValues}
          min={0}
          max={300000}
          step={500}
        />
      </div>
    </div>
  );
};

export default PriceFilter;
