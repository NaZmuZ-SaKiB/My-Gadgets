"use client";

import Image from "next/image";
import { Check, X } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { ChangeEvent, useEffect, useState } from "react";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useProductGetAllQuery } from "@/lib/queries/product.query";
import { TProduct } from "@/types/product.type";
import { cn } from "@/lib/utils";

type TProps = {
  name: string;
  label: string;
  description?: string;
  defaultValue?: TProduct[];
  multiple?: boolean;
};

const ProductSelect = ({
  name,
  label,
  description,
  multiple = false,
  defaultValue = [],
}: TProps) => {
  const { control, setValue } = useFormContext();

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [multipleValues, setMultipleValues] = useState<TProduct[]>(
    multiple ? defaultValue : [],
  );
  const [selectedValue, setSelectedValue] = useState<TProduct | null>(
    !multiple ? defaultValue[0] : null,
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (open) {
      setSearch(e.target.value);
    }
  };

  const selectValue = (product: TProduct) => {
    if (multiple) {
      const isActive = !!multipleValues.find(
        (item) => item._id === product._id,
      );

      if (isActive) {
        setMultipleValues((prev) =>
          prev.filter((item) => item._id !== product._id),
        );
      } else {
        setMultipleValues((prev) => [...prev, product]);
      }
    } else {
      setSelectedValue(product);
    }
    setSearch("");
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  useEffect(() => {
    if (multiple) {
      setValue(
        name,
        multipleValues.map((item) => item._id),
      );
    } else {
      setValue(name, selectedValue?._id);
    }
  }, [multipleValues, selectedValue, name, multiple, setValue]);

  const { data, isLoading, isFetching } = useProductGetAllQuery(
    `limit=5&searchTerm=${debouncedSearch}`,
  );

  const options = data?.data || [];

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem className="flex w-full flex-col gap-1">
          <FormLabel className={"text-nowrap font-medium"}>{label}</FormLabel>

          <FormControl>
            <>
              {(multipleValues.length > 0 || !!selectedValue) && (
                <div className="flex max-h-[300px] flex-col gap-1 overflow-y-auto border border-slate-300 p-1">
                  {multipleValues.length > 0 &&
                    multipleValues.map((item) => (
                      <div
                        key={`${item?._id}`}
                        className="flex items-center gap-2 bg-slate-100 p-2"
                      >
                        <Image
                          src={item.images[0].secureUrl}
                          alt={item.model}
                          width={25}
                          height={25}
                        />
                        <span className="text-xs">{item?.name}</span>
                        <span onClick={() => selectValue(item)}>
                          <X className="size-4 cursor-pointer hover:text-primary" />
                        </span>
                      </div>
                    ))}
                  {!!selectedValue && (
                    <div className="flex items-center gap-2 bg-slate-100 p-2">
                      <Image
                        src={selectedValue.images[0].secureUrl}
                        alt={selectedValue.model}
                        width={25}
                        height={25}
                      />
                      <span>{selectedValue?.name}</span>
                      <span onClick={() => selectValue(selectedValue)}>
                        <X className="size-4 cursor-pointer hover:text-primary" />
                      </span>
                    </div>
                  )}
                </div>
              )}
              <div className="relative">
                <Input
                  type="text"
                  placeholder={label.replace("*", "")}
                  className="rounded-none bg-slate-50 focus-visible:border-primary focus-visible:bg-white focus-visible:ring-0 focus-visible:ring-offset-0"
                  value={search}
                  onFocus={() => setOpen(true)}
                  onBlur={() => setOpen(false)}
                  onChange={handleChange}
                />
                <div
                  className={cn(
                    "absolute top-[100%] z-50 w-full border border-t-0 border-slate-200 bg-white",
                    {
                      hidden: !open,
                    },
                  )}
                >
                  <ScrollArea className="max-h-[160px] w-full overflow-y-auto">
                    {isLoading || isFetching ? (
                      <div>Loading...</div>
                    ) : (
                      options.map((option: any) => {
                        const active = multiple
                          ? !!multipleValues.find(
                              (item) => item?._id === option?._id,
                            )
                          : !!selectedValue?._id === option._id;

                        return (
                          <div
                            key={`${name}-${option?._id}`}
                            className={cn(
                              "flex cursor-pointer items-center gap-2 px-3 py-1.5 text-sm text-slate-900 hover:bg-primary hover:text-slate-50",
                              {
                                "bg-slate-100 hover:bg-slate-100 hover:text-slate-900":
                                  active,
                              },
                            )}
                            onMouseDown={() => selectValue(option)}
                          >
                            {active && (
                              <span>
                                <Check className="size-4" />
                              </span>
                            )}
                            <span>{option?.name}</span>
                          </div>
                        );
                      })
                    )}
                  </ScrollArea>
                </div>
              </div>
            </>
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

export default ProductSelect;
