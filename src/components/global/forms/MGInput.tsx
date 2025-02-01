"use client";

import { HTMLInputTypeAttribute } from "react";
import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";

type TProps = {
  name: string;
  label: string;
  showLabel?: boolean;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  className?: string;
  vertical?: boolean;
  description?: string;
};

const MGInput = ({
  name,
  label,
  showLabel = true,
  placeholder,
  className,
  type = "text",
  description,
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
            "grid grid-cols-[1fr_2fr] items-center gap-x-2": vertical,
          })}
        >
          {showLabel && (
            <FormLabel className={"text-nowrap font-medium"}>{label}</FormLabel>
          )}
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder || label.replace("*", "")}
              className={cn(
                "h-auto rounded-xl border-none bg-slate-100 p-4 focus-visible:ring-primary focus-visible:ring-offset-0",
                {
                  "!mt-0": vertical,
                  "size-5 cursor-pointer": type === "checkbox",
                },
                className,
              )}
              {...field}
            />
          </FormControl>
          {description && (
            <FormDescription className="col-span-2">
              {description}
            </FormDescription>
          )}
          <FormMessage className="!mt-0 font-normal" />
        </FormItem>
      )}
    />
  );
};

export default MGInput;
