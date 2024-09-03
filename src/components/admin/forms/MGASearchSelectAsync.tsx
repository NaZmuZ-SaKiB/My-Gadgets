"use client";

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
import { UseQueryResult } from "@tanstack/react-query";
import { Check, X } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

type TProps = {
  name: string;
  label: string;
  description?: string;
  optionLabelField: string;
  defaultValue?: any[];
  multiple?: boolean;
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
  fetchFunction,
}: TProps) => {
  const { control, setValue } = useFormContext();

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [multipleValues, setMultipleValues] = useState<any[]>(defaultValue);
  const [selectedValue, setSelectedValue] = useState<any>(
    defaultValue[0] || null
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
          prev.filter((item) => item.value !== value)
        );
      } else {
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
    if (multiple && multipleValues.length > 0) {
      setValue(
        name,
        multipleValues.map((item) => item?.value)
      );
    } else {
      setValue(name, selectedValue?.value);
    }
  }, [multipleValues, selectedValue, name, multiple, setValue]);

  const { data, isLoading, isFetching } = fetchFunction(
    `limit=5&searchTerm=${debouncedSearch}`
  );

  const options = data?.data || [];

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem className="flex flex-col gap-1 w-full">
          <FormLabel className={"font-medium text-nowrap"}>{label}</FormLabel>

          <FormControl>
            <>
              {(multipleValues.length > 0 || !!selectedValue) && (
                <div className="flex flex-wrap text-sm gap-1 border border-slate-300 p-1 max-h-[200px] overflow-y-auto">
                  {multipleValues.length > 0 &&
                    multipleValues.map((item) => (
                      <div
                        key={`${item?.value}`}
                        className="bg-slate-100 px-2 py-0.5 flex gap-2 items-center"
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
                    <div className="bg-slate-100 px-2 py-0.5 flex gap-2 items-center">
                      <span
                        onClick={() =>
                          selectValue(
                            selectedValue?.value,
                            selectedValue?.title
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
                  className="rounded-none bg-slate-50 focus-visible:bg-white focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary"
                  value={search}
                  onFocus={() => setOpen(true)}
                  onBlur={() => setOpen(false)}
                  onChange={handleChange}
                />
                <div
                  className={cn(
                    "absolute z-50 top-[100%] bg-white border border-t-0 border-slate-200 w-full",
                    {
                      hidden: !open,
                    }
                  )}
                >
                  <ScrollArea className="max-h-[160px] w-full overflow-y-auto">
                    {isLoading || isFetching ? (
                      <div>Loading...</div>
                    ) : (
                      options.map((option: any) => {
                        const active = multiple
                          ? !!multipleValues.find(
                              (item) => item?.value === option?._id
                            )
                          : !!selectedValue.value === option._id;

                        return (
                          <div
                            key={`${option?._id}`}
                            className={cn(
                              "px-3 py-1.5 text-slate-900 hover:bg-primary hover:text-slate-50 cursor-pointer flex items-center gap-2 text-sm",
                              {
                                "bg-slate-100 hover:bg-slate-100 hover:text-slate-900":
                                  active,
                              }
                            )}
                            onMouseDown={() =>
                              selectValue(
                                option?._id,
                                option?.[optionLabelField]
                              )
                            }
                          >
                            {active && (
                              <span>
                                <Check className="size-4" />
                              </span>
                            )}
                            <span>{option?.[optionLabelField]}</span>
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
          <FormMessage className="font-normal !mt-0" />
        </FormItem>
      )}
    />
  );
};

export default MGASearchSelectAsync;
