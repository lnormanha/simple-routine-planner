"use client";

import { useState, useEffect } from "react";
import { addDays, format, startOfWeek } from "date-fns";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type WeekCalendarProps = {
  onSelectDate: (date: Date) => void;
};

export const WeekCalendar: React.FC<WeekCalendarProps> = ({ onSelectDate }) => {
  const [weekStart, setWeekStart] = useState(startOfWeek(new Date()));

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const goToPreviousWeek = () => setWeekStart(addDays(weekStart, -7));
  const goToNextWeek = () => setWeekStart(addDays(weekStart, 7));

  useEffect(() => {
    onSelectDate(weekStart);
  }, [weekStart, onSelectDate]);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Button variant="outline" size="icon" onClick={goToPreviousWeek}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="font-semibold">
          {format(weekStart, "MMMM d, yyyy")} -{" "}
          {format(addDays(weekStart, 6), "MMMM d, yyyy")}
        </span>
        <Button variant="outline" size="icon" onClick={goToNextWeek}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {weekDays.map((day) => (
          <Button
            key={day.toISOString()}
            variant="outline"
            className="h-14"
            onClick={() => onSelectDate(day)}
          >
            <div className="flex flex-col items-center">
              <span className="text-xs">{format(day, "EEE")}</span>
              <span className="text-lg">{format(day, "d")}</span>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};
