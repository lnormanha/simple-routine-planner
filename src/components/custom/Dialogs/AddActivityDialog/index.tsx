import { useState, useMemo } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

type AddActivityModalProps = {
  routine: WeekRoutine;
  day: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRoutineChange: (routine: WeekRoutine) => void;
};

export const AddActivityModal = ({
  routine,
  day,
  open,
  onOpenChange,
  onRoutineChange,
}: AddActivityModalProps) => {
  const { tags: savedTags, addTag } = useTagsStore();
  const [newItem, setNewItem] = useState<Partial<RoutineItem>>({
    time: "",
    activity: "",
    color: "bg-blue-500",
    tags: [],
  });
  const [selectedDays, setSelectedDays] = useState<string[]>([day]);
  const [isNewActivity, setIsNewActivity] = useState(true);

  const existingActivities = useMemo(() => {
    const activities = new Set<string>();
    Object.values(routine.routine).forEach((dayRoutine) => {
      dayRoutine.routineItems.forEach((item) => {
        activities.add(item.activity);
      });
    });
    return Array.from(activities);
  }, [routine]);

  const handleExistingActivitySelect = (activity: string) => {
    for (const dayRoutine of Object.values(routine.routine)) {
      const existingItem = dayRoutine.routineItems.find(
        (item) => item.activity === activity
      );
      if (existingItem) {
        setNewItem({
          activity: existingItem.activity,
          color: existingItem.color,
          tags: [...existingItem.tags],
          time: newItem.time || existingItem.time, // Keep current time if set
        });
        break;
      }
    }
  };

  const handleSubmit = () => {
    if (newItem.time && newItem.activity) {
      const updatedRoutine = { ...routine };
      const activityId = Date.now().toString(); // Generate a single ID for all instances

      selectedDays.forEach((selectedDay) => {
        updatedRoutine.routine[selectedDay] = {
          ...updatedRoutine.routine[selectedDay],
          routineItems: [
            ...(updatedRoutine.routine[selectedDay]?.routineItems || []),
            { ...newItem, id: activityId } as RoutineItem,
          ].sort((a, b) => a.time.localeCompare(b.time)),
        };
      });

      onRoutineChange(updatedRoutine);
      setNewItem({ time: "", activity: "", color: "bg-blue-500", tags: [] });
      setSelectedDays([day]);
      setIsNewActivity(true);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Activity</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label>Time</Label>
              <TimePicker
                value={newItem.time || ""}
                onChange={(time) => setNewItem((prev) => ({ ...prev, time }))}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Label>Activity</Label>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="new-activity"
                checked={isNewActivity}
                onCheckedChange={(checked) =>
                  setIsNewActivity(checked as boolean)
                }
              />
              <Label htmlFor="new-activity">Create new activity</Label>
            </div>
            {isNewActivity ? (
              <Input
                placeholder="Activity name"
                value={newItem.activity}
                onChange={(e) =>
                  setNewItem((prev) => ({
                    ...prev,
                    activity: e.target.value,
                  }))
                }
              />
            ) : (
              <Select
                value={newItem.activity}
                onValueChange={handleExistingActivitySelect}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an activity" />
                </SelectTrigger>
                <SelectContent>
                  {existingActivities.map((activity) => (
                    <SelectItem key={activity} value={activity}>
                      {activity}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          <div className="flex-1">
            <TagInput
              tags={newItem.tags || []}
              onTagsChange={(tags) => setNewItem((prev) => ({ ...prev, tags }))}
              onAddTag={addTag}
              savedTags={savedTags}
            />
          </div>

          <div className="flex items-center gap-2">
            <Label>Color:</Label>
            <ColorPicker
              selectedColor={newItem.color || "bg-blue-500"}
              onColorChange={(color: string) =>
                setNewItem((prev) => ({ ...prev, color }))
              }
            />
          </div>

          <div className="flex flex-col gap-4">
            <Label>Add to days:</Label>
            <div className="flex flex-col gap-2">
              <div className="flex items-center space-x-2 pb-2 border-b">
                <Checkbox
                  id="select-all"
                  checked={selectedDays.length === DAYS_OF_WEEK.length}
                  onCheckedChange={(checked) => {
                    setSelectedDays(checked ? [...DAYS_OF_WEEK] : []);
                  }}
                />
                <Label htmlFor="select-all" className="font-medium">
                  Select All Days
                </Label>
              </div>
              {DAYS_OF_WEEK.map((dayOfWeek) => (
                <div key={dayOfWeek} className="flex items-center space-x-2">
                  <Checkbox
                    id={dayOfWeek}
                    checked={selectedDays.includes(dayOfWeek)}
                    onCheckedChange={(checked) => {
                      setSelectedDays((prev) =>
                        checked
                          ? [...prev, dayOfWeek]
                          : prev.filter((d) => d !== dayOfWeek)
                      );
                    }}
                  />
                  <Label htmlFor={dayOfWeek} className="capitalize">
                    {dayOfWeek}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Add Activity</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
