"use client";

import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { TSelectOption } from "./MGASelect";
import MultipleSelector from "@/components/ui/multi-select";

import { cn } from "@/lib/utils";

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
          className={cn("flex w-full flex-col gap-1", {
            "grid grid-cols-[1fr_2fr] items-center gap-2": vertical,
            "grid-cols-1": vertical && !label,
          })}
        >
          {label && (
            <FormLabel className={"text-nowrap text-xs font-medium"}>
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

          <FormMessage className="!mt-0 font-normal" />
        </FormItem>
      )}
    />
  );
};

export default MGAMultiSelect;
