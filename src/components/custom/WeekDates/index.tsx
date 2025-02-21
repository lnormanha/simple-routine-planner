import { format, startOfWeek, addDays } from "date-fns"

export function WeekDates() {
  const today = new Date()
  const weekStart = startOfWeek(today)
  const weekDates = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))

  return (
    <div className="flex justify-between mb-4">
      {weekDates.map((date, index) => (
        <div key={index} className="text-center">
          <div className="font-medium">{format(date, "EEE")}</div>
          <div className="text-sm text-muted-foreground">{format(date, "MMM d")}</div>
        </div>
      ))}
    </div>
  )
}

