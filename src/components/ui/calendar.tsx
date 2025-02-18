"use client";

import * as React from "react";
import {
  DayPicker,
  // DropdownProps as OriginalDropdownProps,
} from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "./select";
// import { ScrollArea } from "./scroll-area";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

// type DropdownProps = OriginalDropdownProps & {
//   children?: React.ReactNode;
// };

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months:
          "flex flex-col relative sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        // month: "space-y-4",
        // caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium hidden",
        // nav: "space-x-1 flex items-center",
        // nav_button: cn(
        //   buttonVariants({ variant: "outline" }),
        //   "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        // ),
        // nav_button_previous: "absolute left-1",
        // nav_button_next: "absolute right-1",
        // table: "w-full border-collapse space-y-1",
        // head_row: "flex",
        // head_cell:
        //   "text-slate-500 rounded-md w-9 font-normal text-[0.8rem] dark:text-slate-400",
        // row: "flex w-full mt-2",
        // cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-slate-100/50 [&:has([aria-selected])]:bg-slate-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 dark:[&:has([aria-selected].day-outside)]:bg-slate-800/50 dark:[&:has([aria-selected])]:bg-slate-800",
        outside: "text-slate-300",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 font-normal aria-selected:opacity-100 cursor-pointer",
        ),
        day_button: "p-2",
        day_range_end: "day-range-end",
        day_today:
          "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-50",
        selected:
          "bg-slate-900 !text-slate-50 hover:bg-slate-900 hover:text-slate-50 focus:bg-slate-900 focus:text-slate-50 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50 dark:hover:text-slate-900 dark:focus:bg-slate-50 dark:focus:text-slate-900",
        // day_selected:
        //   "bg-slate-900 !text-slate-50 hover:bg-slate-900 hover:text-slate-50 focus:bg-slate-900 focus:text-slate-50 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50 dark:hover:text-slate-900 dark:focus:bg-slate-50 dark:focus:text-slate-900",
        // day_outside:
        //   "day-outside text-slate-500 opacity-50 aria-selected:bg-slate-100/50 aria-selected:text-slate-500 aria-selected:opacity-30 dark:text-slate-400 dark:aria-selected:bg-slate-800/50 dark:aria-selected:text-slate-400",
        dropdowns: "flex items-center gap-2 mb-4 text-sm",
        day_disabled: "text-slate-500 opacity-50 dark:text-slate-400",
        day_range_middle:
          "aria-selected:bg-slate-100 aria-selected:text-slate-900 dark:aria-selected:bg-slate-800 dark:aria-selected:text-slate-50",
        day_hidden: "invisible",
        caption_dropdowns: "flex items-center gap-2",
        chevron: "w-5 h-5 fill-slate-500",
        nav: "order-2 absolute top-0 right-0",
        weekdays: "flex justify-between text-slate-700 text-sm",
        ...classNames,
      }}
      // components={{
      //   Dropdown: ({ value, onChange, children, ...props }: DropdownProps) => {
      //     console.log("Dropdown Value:", value);
      //     console.log("Children:", children);

      //     const options = React.Children.toArray(
      //       children,
      //     ) as React.ReactElement<React.HTMLProps<HTMLOptionElement>>[];
      //     const selected = options.find((child) => child.props.value === value);
      //     const handleChange = (value: string) => {
      //       const changeEvent = {
      //         target: { value },
      //       } as React.ChangeEvent<HTMLSelectElement>;
      //       onChange?.(changeEvent);
      //     };
      //     return (
      //       <Select
      //         value={value?.toString()}
      //         onValueChange={(value) => {
      //           handleChange(value);
      //         }}
      //       >
      //         <SelectTrigger className="pr-1.5 focus:ring-0">
      //           <SelectValue>{selected?.props?.children}</SelectValue>
      //         </SelectTrigger>
      //         <SelectContent position="popper">
      //           <ScrollArea className="h-80">
      //             {options.map((option, id: number) => (
      //               <SelectItem
      //                 key={`${option.props.value}-${id}`}
      //                 value={option.props.value?.toString() ?? ""}
      //               >
      //                 {option.props.children}
      //               </SelectItem>
      //             ))}
      //           </ScrollArea>
      //         </SelectContent>
      //       </Select>
      //     );
      //   },
      // }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
