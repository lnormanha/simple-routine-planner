import { useState } from "react";
import { RoutineItem, WeekRoutine } from "@/types/routine";
import { DAYS_OF_WEEK } from "@/constants/week";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type DeleteActivityDialogProps = {
  routine: WeekRoutine;
  day: string;
  activity: RoutineItem;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRoutineChange: (routine: WeekRoutine) => void;
};

export const DeleteActivityDialog = ({
  routine,
  day,
  activity,
  open,
  onOpenChange,
  onRoutineChange,
}: DeleteActivityDialogProps) => {
  // Initialize with all days where the activity exists
  const [selectedDays, setSelectedDays] = useState<string[]>(() => {
    return DAYS_OF_WEEK.filter((d) =>
      routine.routine[d].routineItems.some(
        (item) =>
          item.activity === activity.activity && item.time === activity.time
      )
    );
  });

  const handleDelete = () => {
    if (selectedDays.length > 0) {
      const updatedRoutine = { ...routine };

      // Remove the activity from selected days
      selectedDays.forEach((selectedDay) => {
        updatedRoutine.routine[selectedDay] = {
          ...updatedRoutine.routine[selectedDay],
          routineItems: updatedRoutine.routine[selectedDay].routineItems.filter(
            (item) =>
              !(
                item.activity === activity.activity &&
                item.time === activity.time
              )
          ),
        };
      });

      onRoutineChange(updatedRoutine);
      onOpenChange(false);
    }
  };

  // Get available days where the activity exists
  const availableDays = DAYS_OF_WEEK.filter((d) =>
    routine.routine[d].routineItems.some(
      (item) =>
        item.activity === activity.activity && item.time === activity.time
    )
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Activity</DialogTitle>
          <DialogDescription>
            Select the days from which you want to remove "{activity.activity}"
            at {activity.time}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label>Days to remove from:</Label>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 pb-2 border-b">
                <Checkbox
                  id="select-all"
                  checked={selectedDays.length === availableDays.length}
                  onCheckedChange={(checked) => {
                    setSelectedDays(checked ? availableDays : []);
                  }}
                />
                <label htmlFor="select-all" className="font-medium">
                  Select All Available Days
                </label>
              </div>
              <div className="flex flex-wrap gap-2">
                {DAYS_OF_WEEK.map((dayOfWeek) => {
                  const hasActivity = routine.routine[
                    dayOfWeek
                  ].routineItems.some(
                    (item) =>
                      item.activity === activity.activity &&
                      item.time === activity.time
                  );
                  if (!hasActivity) return null;

                  return (
                    <div key={dayOfWeek} className="flex items-center gap-2">
                      <Checkbox
                        id={`delete-day-${dayOfWeek}`}
                        checked={selectedDays.includes(dayOfWeek)}
                        disabled={
                          selectedDays.length === 1 &&
                          selectedDays.includes(dayOfWeek)
                        }
                        onCheckedChange={(checked) => {
                          setSelectedDays(
                            checked
                              ? [...selectedDays, dayOfWeek]
                              : selectedDays.filter((d) => d !== dayOfWeek)
                          );
                        }}
                      />
                      <label
                        htmlFor={`delete-day-${dayOfWeek}`}
                        className="text-sm capitalize"
                      >
                        {dayOfWeek}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
