"use client";

import { toast } from "sonner";
import { Check, X } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { UseQueryResult } from "@tanstack/react-query";
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

import { cn } from "@/lib/utils";

type TProps = {
  name: string;
  label: string;
  description?: string;
  optionLabelField: string;
  defaultValue?: any[];
  multiple?: boolean;
  imageRequired?: boolean;
  max?: number;
  fetchFunction: (filters: any) => UseQueryResult<{
    statusCode: number;
    success: boolean;
    message: string;
    data: any;
  }>;
};

const MGASearchSelectAsync = ({
  name,
  label,
  description,
  optionLabelField,
  multiple = false,
  defaultValue = [],
  imageRequired = false,
  max,
  fetchFunction,
}: TProps) => {
  const { control, setValue } = useFormContext();

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [multipleValues, setMultipleValues] = useState<any[]>(defaultValue);
  const [selectedValue, setSelectedValue] = useState<any>(
    !multiple ? defaultValue[0] : null,
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (open) {
      setSearch(e.target.value);
    }
  };

  const selectValue = (value: string, title: string) => {
    if (multiple) {
      const isActive = !!multipleValues.find((item) => item.value === value);

      if (isActive) {
        setMultipleValues((prev) =>
          prev.filter((item) => item.value !== value),
        );
      } else {
        if (max && multipleValues.length === max) {
          toast.warning(`You can only select up to ${max} items.`);
          return;
        }

        setMultipleValues((prev) => [...prev, { value, title }]);
      }
    } else {
      setSelectedValue({ value, title });
    }
    setSearch("");
    setOpen(true);
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
        multipleValues.map((item) => item?.value),
      );
    } else {
      setValue(name, selectedValue?.value);
    }
  }, [multipleValues, selectedValue, name, multiple, setValue]);

  const { data, isLoading, isFetching } = fetchFunction(
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
                <div className="flex max-h-[200px] flex-wrap gap-1 overflow-y-auto border border-slate-300 p-1 text-sm">
                  {multipleValues.length > 0 &&
                    multipleValues.map((item) => (
                      <div
                        key={`${item?.value}`}
                        className="flex items-center gap-2 bg-slate-100 px-2 py-0.5"
                      >
                        <span
                          onClick={() => selectValue(item?.value, item?.title)}
                        >
                          <X className="size-4 cursor-pointer hover:text-primary" />
                        </span>
                        <span>{item?.title}</span>
                      </div>
                    ))}
                  {!!selectedValue && (
                    <div className="flex items-center gap-2 bg-slate-100 px-2 py-0.5">
                      <span
                        onClick={() =>
                          selectValue(
                            selectedValue?.value,
                            selectedValue?.title,
                          )
                        }
                      >
                        <X className="size-4 cursor-pointer hover:text-primary" />
                      </span>
                      <span>{selectedValue?.title}</span>
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
                              (item) => item?.value === option?._id,
                            )
                          : !!selectedValue.value === option._id;

                        return (
                          <div
                            key={`${option?._id}`}
                            className={cn(
                              "flex cursor-pointer items-center gap-2 px-3 py-1.5 text-sm text-slate-900 hover:bg-primary hover:text-slate-50",
                              {
                                "bg-slate-100 hover:bg-slate-100 hover:text-slate-900":
                                  active,
                                "pointer-events-none bg-slate-200":
                                  imageRequired && !option?.image,
                              },
                            )}
                            onMouseDown={() =>
                              selectValue(
                                option?._id,
                                option?.[optionLabelField],
                              )
                            }
                          >
                            {active && (
                              <span>
                                <Check className="size-4" />
                              </span>
                            )}
                            <span>
                              {option?.[optionLabelField]}
                              {imageRequired && !option?.image && (
                                <span className="text-xs text-red-500">
                                  {" "}
                                  - Image Required
                                </span>
                              )}
                            </span>
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

export default MGASearchSelectAsync;
