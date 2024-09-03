"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { convertTimeTo12HourFormat } from "@/utils/time";
import MGButton from "@/components/global/shared/MGButton";

type TProps = {
  name: string;
  label: string;
  vertical?: boolean;
  className?: string;
  defaultValue?: Date;
};

const MGADateTimePicker = ({
  name,
  label,
  className,
  defaultValue,
  vertical = false,
}: TProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState<string>("00:00");
  const [date, setDate] = useState<Date | null>(null);

  const handleTimeChange = (e: string, field: any) => {
    setTime(e);
    if (date) {
      const [hours, minutes] = e.split(":");
      const newDate = new Date(date.getTime());
      newDate.setHours(parseInt(hours), parseInt(minutes));
      setDate(newDate);
      field.onChange(newDate);
    }
  };

  const { control } = useFormContext();

  useEffect(() => {
    if (defaultValue) {
      const defaultDate = new Date(defaultValue);
      setDate(defaultDate);
      const hours = defaultDate.getHours();
      const minutes = defaultDate.getMinutes();
      setTime(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}`
      );
    }
  }, [defaultValue]);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn("flex flex-col gap-1 w-full", {
            "grid grid-cols-[1fr_2fr] gap-2 items-center": vertical,
          })}
        >
          <FormLabel className={"font-medium text-nowrap"}>{label}</FormLabel>
          <FormControl>
            <Popover>
              <PopoverTrigger asChild>
                <MGButton
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground",
                    "border-slate-200 bg-slate-50 hover:border-primary hover:bg-slate-50 hover:text-primary",
                    {
                      "!mt-0": vertical,
                    }
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                  {" : "}
                  {time && convertTimeTo12HourFormat(time)}
                </MGButton>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 flex">
                <Calendar
                  mode="single"
                  captionLayout="dropdown"
                  selected={date || field.value}
                  onSelect={(selectedDate) => {
                    const [hours, minutes] = time?.split(":")!;
                    selectedDate?.setHours(parseInt(hours), parseInt(minutes));
                    setDate(selectedDate!);
                    field.onChange(selectedDate);
                  }}
                  onDayClick={() => setIsOpen(false)}
                  fromYear={2000}
                  toYear={new Date().getFullYear()}
                  disabled={(date) =>
                    Number(date) < Date.now() - 1000 * 60 * 60 * 24 ||
                    Number(date) > Date.now() + 1000 * 60 * 60 * 24 * 30
                  }
                />

                <div className="p-4 flex flex-col items-center gap-4">
                  <div className="px-4 py-2 text-sm rounded-md border">
                    {convertTimeTo12HourFormat(time)}
                  </div>
                  <ScrollArea className="h-[15rem]">
                    {Array.from({ length: 96 }).map((_, i) => {
                      const hour = Math.floor(i / 4)
                        .toString()
                        .padStart(2, "0");
                      const minute = ((i % 4) * 15).toString().padStart(2, "0");
                      const timeSelected = time === `${hour}:${minute}`;
                      return (
                        <div
                          className={cn(
                            "px-4 py-1.5 text-sm my-1 rounded-md hover:bg-slate-100 cursor-pointer",
                            {
                              "bg-slate-900 text-slate-50 hover:bg-slate-900":
                                timeSelected,
                            }
                          )}
                          key={i}
                          onClick={() =>
                            handleTimeChange(`${hour}:${minute}`, field)
                          }
                        >
                          {convertTimeTo12HourFormat(`${hour}:${minute}`)}
                        </div>
                      );
                    })}
                  </ScrollArea>
                </div>
              </PopoverContent>
            </Popover>
          </FormControl>

          <FormMessage className="font-normal col-span-2 !mt-0" />
        </FormItem>
      )}
    />
  );
};

export default MGADateTimePicker;
