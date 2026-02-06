import React from "react";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { timeSlots } from "./booking-constants";

export function TimeSlotPicker({
    selected,
    onSelect
}: {
    selected: string;
    onSelect: (val: string) => void;
}) {
    return (
        <div className="flex flex-col gap-2 h-full">
            <div className="grid grid-cols-1 gap-2">
                {timeSlots.map((slot) => {
                    const isSelected = selected === slot;
                    return (
                        <button
                            key={slot}
                            type="button"
                            onClick={() => onSelect(slot)}
                            className={cn(
                                "flex items-center justify-between px-4 py-3 rounded-xl border transition-all duration-300",
                                isSelected
                                    ? "bg-champagne border-champagne text-white shadow-md transform scale-[1.02]"
                                    : "bg-white border-sand/20 text-charcoal hover:border-champagne/40 hover:bg-ivory/50 shadow-sm"
                            )}
                        >
                            <span className="text-xs font-medium tracking-wide">{slot}</span>
                            <div className={cn(
                                "w-4 h-4 rounded-full border flex items-center justify-center transition-all duration-300",
                                isSelected ? "bg-white border-white" : "border-sand/40"
                            )}>
                                {isSelected && <CheckCircle2 className="w-2.5 h-2.5 text-champagne font-bold" />}
                            </div>
                        </button>
                    );
                })}
            </div>
            <p className="text-[9px] text-charcoal/40 italic leading-tight text-center px-2 mt-auto">
                * Confirmation provided after request.
            </p>
        </div>
    );
}
