"use client";

import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";

export type TSelectOption = {
  label: string;
  value: string;
};

type TProps = {
  options: TSelectOption[];
  name: string;
  label: string;
  className?: string;
  vertical?: boolean;
};

const MGASelect = ({
  options,
  name,
  label,
  className,
  vertical = false,
}: TProps) => {
  const { control } = useFormContext();

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
          <Select
            value={field.value}
            onValueChange={(value) => {
              if (value === "select") return;
              else field.onChange(value);
            }}
          >
            <FormControl>
              <SelectTrigger
                className={cn(
                  "rounded-none bg-slate-50 focus:border-primary focus:ring-0 focus:ring-offset-0",
                  {
                    "!mt-0": vertical,
                  },
                  className,
                )}
              >
                <SelectValue
                  className={cn("")}
                  placeholder={label.replace("*", "")}
                />
              </SelectTrigger>
            </FormControl>

            <SelectContent>
              <SelectItem value={"select"}>Select</SelectItem>
              {options.map((option, index) => (
                <SelectItem
                  key={`${label}-${option.value}`}
                  value={option.value}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage className="!mt-0 font-normal" />
        </FormItem>
      )}
    />
  );
};

export default MGASelect;
