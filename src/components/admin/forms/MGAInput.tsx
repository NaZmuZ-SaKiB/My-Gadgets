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
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  className?: string;
  vertical?: boolean;
  description?: string;
};

const MGAInput = ({
  name,
  label,
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
          <FormLabel className={"text-nowrap text-xs font-medium"}>
            {label}
          </FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder || label.replace("*", "")}
              className={cn(
                "!mt-1 rounded-none bg-slate-50 focus-visible:border-primary focus-visible:ring-0 focus-visible:ring-offset-0",
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
          <FormMessage className="col-span-2 !mt-0 font-normal" />
        </FormItem>
      )}
    />
  );
};

export default MGAInput;
