"use client";

import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

import { cn } from "@/lib/utils";

type TProps = {
  name: string;
  label: string;
  showLabel?: boolean;
  placeholder?: string;
  className?: string;
  vertical?: boolean;
  description?: string;
};

const MGTextarea = ({
  name,
  label,
  showLabel = true,
  placeholder,
  className,
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
            <Textarea
              placeholder={placeholder || label.replace("*", "")}
              className={cn(
                "h-auto max-h-40 rounded-xl border-none bg-slate-100 p-4 focus-visible:ring-primary focus-visible:ring-offset-0",
                {
                  "!mt-0": vertical,
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

export default MGTextarea;
