import { useState } from "react";
import { useTagsStore } from "@/store/tags";
import { RoutineItem, WeekRoutine } from "@/types/routine";
import { DAYS_OF_WEEK } from "@/constants/week";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TimePicker } from "@/components/custom/Inputs/TimeInput/TimeInput";
import { ColorPicker } from "@/components/custom/ColorPicker";
import { TagInput } from "@/components/custom/Inputs/TagInput";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type EditActivityDialogProps = {
  routine: WeekRoutine;
  day: string;
  activity: RoutineItem;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRoutineChange: (routine: WeekRoutine) => void;
};

export const EditActivityDialog = ({
  routine,
  activity,
  open,
  onOpenChange,
  onRoutineChange,
}: EditActivityDialogProps) => {
  const { tags: savedTags, addTag } = useTagsStore();
  const [editedItem, setEditedItem] = useState<RoutineItem>({ ...activity });
  const [selectedDays, setSelectedDays] = useState<string[]>(() => {
    return DAYS_OF_WEEK.filter((d) =>
      routine.routine[d].routineItems.some(
        (item) =>
          item.activity === activity.activity && item.time === activity.time
      )
    );
  });

  const handleSubmit = () => {
    if (editedItem.time && editedItem.activity && selectedDays.length > 0) {
      const updatedRoutine = { ...routine };

      Object.keys(updatedRoutine.routine).forEach((routineDay) => {
        updatedRoutine.routine[routineDay] = {
          ...updatedRoutine.routine[routineDay],
          routineItems: updatedRoutine.routine[routineDay].routineItems.filter(
            (item) =>
              !(
                item.activity === activity.activity &&
                item.time === activity.time
              )
          ),
        };
      });

      selectedDays.forEach((selectedDay) => {
        updatedRoutine.routine[selectedDay] = {
          ...updatedRoutine.routine[selectedDay],
          routineItems: [
            ...(updatedRoutine.routine[selectedDay]?.routineItems || []),
            { ...editedItem, id: activity.id },
          ].sort((a, b) => a.time.localeCompare(b.time)),
        };
      });

      onRoutineChange(updatedRoutine);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Activity</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label>Time</Label>
            <TimePicker
              value={editedItem.time}
              onChange={(time) => setEditedItem({ ...editedItem, time })}
            />
          </div>

          <div className="space-y-2">
            <Label>Activity</Label>
            <Input
              value={editedItem.activity}
              onChange={(e) =>
                setEditedItem({ ...editedItem, activity: e.target.value })
              }
            />
          </div>

          <div className="flex flex-row gap-2 items-center">
            <Label>Color:</Label>
            <ColorPicker
              selectedColor={editedItem.color}
              onColorChange={(color: string) =>
                setEditedItem({ ...editedItem, color })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Tags</Label>
            <TagInput
              tags={editedItem.tags}
              onTagsChange={(tags: string[]) =>
                setEditedItem({ ...editedItem, tags })
              }
              onAddTag={addTag}
              savedTags={savedTags}
            />
          </div>

          <div className="space-y-2">
            <Label>Days</Label>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 pb-2 border-b">
                <Checkbox
                  id="select-all"
                  checked={selectedDays.length === DAYS_OF_WEEK.length}
                  onCheckedChange={(checked) => {
                    setSelectedDays(checked ? [...DAYS_OF_WEEK] : []);
                  }}
                />
                <label htmlFor="select-all" className="font-medium">
                  Select All Days
                </label>
              </div>
              <div className="flex flex-col gap-2">
                {DAYS_OF_WEEK.map((dayOfWeek) => (
                  <div key={dayOfWeek} className="flex items-center gap-2">
                    <Checkbox
                      id={`day-${dayOfWeek}`}
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
                      htmlFor={`day-${dayOfWeek}`}
                      className="text-sm capitalize"
                    >
                      {dayOfWeek}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Save Changes</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
