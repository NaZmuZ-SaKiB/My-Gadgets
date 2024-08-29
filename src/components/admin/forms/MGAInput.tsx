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
import { HTMLInputTypeAttribute } from "react";
import { useFormContext } from "react-hook-form";

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
          className={cn("flex flex-col gap-1 w-full", {
            "grid grid-cols-[1fr_2fr] gap-x-2 items-center": vertical,
          })}
        >
          <FormLabel className={"font-medium text-nowrap text-xs"}>
            {label}
          </FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder || label.replace("*", "")}
              className={cn(
                "rounded-none !mt-1 bg-slate-50 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary",
                {
                  "!mt-0": vertical,
                  "size-5 cursor-pointer": type === "checkbox",
                },
                className
              )}
              {...field}
            />
          </FormControl>
          {description && (
            <FormDescription className="col-span-2">
              {description}
            </FormDescription>
          )}
          <FormMessage className="font-normal !mt-0 col-span-2" />
        </FormItem>
      )}
    />
  );
};

export default MGAInput;
