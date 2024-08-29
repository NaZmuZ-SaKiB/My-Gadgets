"use client";

import { useFormContext } from "react-hook-form";
import { TSelectOption } from "./MGASelect";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import MultipleSelector from "@/components/ui/multi-select";

type TProps = {
  options: TSelectOption[];
  name: string;
  label: string;
  className?: string;
  vertical?: boolean;
};

const MGAMultiSelect = ({
  options,
  name,
  label,
  className,
  vertical = false,
}: TProps) => {
  const { control, setValue } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn("flex flex-col gap-1 w-full", {
            "grid grid-cols-[1fr_2fr] gap-2 items-center": vertical,
            "grid-cols-1": vertical && !label,
          })}
        >
          {label && (
            <FormLabel className={"font-medium text-nowrap text-xs"}>
              {label}
            </FormLabel>
          )}

          <FormControl>
            <MultipleSelector
              {...field}
              defaultOptions={options}
              placeholder={label.replace("*", "")}
              emptyIndicator={
                <p className="text-center text-lg leading-10 text-slate-600 dark:text-slate-400">
                  no results found.
                </p>
              }
              badgeClassName="bg-primary"
            />
          </FormControl>

          <FormMessage className="font-normal !mt-0" />
        </FormItem>
      )}
    />
  );
};

export default MGAMultiSelect;
