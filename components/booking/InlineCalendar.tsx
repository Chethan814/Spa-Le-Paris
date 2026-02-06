import React from "react";
import { Calendar } from "@/components/ui/calendar";

export function InlineCalendar({
    selected,
    onSelect,
    disabled
}: {
    selected?: Date;
    onSelect: (date: Date | undefined) => void;
    disabled?: (date: Date) => boolean;
}) {
    return (
        <div className="bg-white rounded-2xl border border-sand/30 shadow-sm overflow-hidden p-0 animate-fade-in scale-90 origin-top">
            <Calendar
                mode="single"
                selected={selected}
                onSelect={onSelect}
                disabled={disabled}
                className="w-full"
            />
        </div>
    );
}
