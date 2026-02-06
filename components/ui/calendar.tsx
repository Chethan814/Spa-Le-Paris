import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames = {},
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        /* ===== LAYOUT ===== */
        months: "flex flex-col gap-4",
        month: "space-y-4",

        /* ===== CAPTION & NAV ===== */
        caption: "relative flex items-center justify-center h-9",
        caption_label: "sr-only",
        nav: "absolute inset-y-0 w-full flex items-center justify-between px-1",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-60 hover:opacity-100 transition"
        ),
        nav_button_previous: "relative",
        nav_button_next: "relative",

        /* ===== TABLE (DO NOT FLEX) ===== */
        table: "w-full border-collapse table-fixed",

        /* ✅ Hide weekday labels WITHOUT breaking layout */
        head_row: "invisible h-0",
        head_cell: "w-9 p-0",

        row: "table-row",
        cell:
          "table-cell h-9 w-9 p-0 text-center align-middle relative",

        /* ===== DAY BUTTON ===== */
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),

        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary focus:bg-primary",
        day_today: "bg-accent text-accent-foreground font-semibold",
        day_outside:
          "text-muted-foreground opacity-40 pointer-events-none",
        day_disabled:
          "text-muted-foreground opacity-30 cursor-not-allowed",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",

        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) => {
          const Icon = orientation === "left" ? ChevronLeft : ChevronRight;
          return <Icon className="h-4 w-4" />;
        },
      }}
      {...props}
    />
  );
}

Calendar.displayName = "Calendar";

export { Calendar };
