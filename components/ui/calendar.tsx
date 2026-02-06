import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-0", className)}
      captionLayout="dropdown"
      startMonth={new Date()}
      endMonth={new Date(new Date().getFullYear() + 5, 11)}
      classNames={{
        months: "flex flex-col w-full",
        month: "space-y-0 w-full",
        caption: "flex justify-between items-center bg-sand/20 p-3 relative h-14 border-b border-sand/30",
        caption_label: "hidden", // We use dropdowns instead
        caption_dropdowns: "flex justify-center flex-1 gap-2 mx-8",
        dropdown: "bg-transparent border-none text-sm font-heading focus:ring-0 focus:outline-none cursor-pointer hover:text-champagne transition-colors appearance-none pr-1",
        dropdown_month: "font-semibold",
        dropdown_year: "opacity-60",
        vhidden: "hidden", // Hide accessibility text that gets in the way of custom layout
        nav: "absolute inset-0 flex items-center justify-between px-2 pointer-events-none",
        nav_button: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-0 hover:bg-champagne/10 text-charcoal/70 pointer-events-auto transition-all duration-200"
        ),
        nav_button_previous: "relative z-10",
        nav_button_next: "relative z-10",
        table: "w-full border-collapse border-l border-t border-sand/30",
        head_row: "flex w-full bg-ivory/50",
        head_cell: "flex-1 text-charcoal font-bold text-xs py-3 border-r border-b border-sand/30 text-center bg-ivory/30",
        row: "flex w-full",
        cell: cn(
          "flex-1 text-center text-sm p-0 relative border-r border-b border-sand/30 h-11 transition-all duration-200",
          "hover:bg-sand/10 focus-within:z-20",
          "[&:has([aria-selected])]:bg-champagne/10"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-full w-full p-0 font-normal hover:bg-transparent rounded-none transition-none"
        ),
        day_selected:
          "bg-champagne text-white hover:bg-champagne-dark hover:text-white focus:bg-champagne focus:text-white font-bold !opacity-100 shadow-inner",
        day_today: "bg-sand/30 text-champagne-dark font-bold",
        day_outside: "text-charcoal/20 opacity-30 cursor-default pointer-events-none",
        day_disabled: "text-charcoal/10 opacity-20 cursor-not-allowed",
        day_range_middle: "aria-selected:bg-champagne/5 aria-selected:text-charcoal",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) => {
          const Icon = orientation === "left" ? ChevronLeft : ChevronRight;
          return <Icon className="h-5 w-5" />;
        },
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
