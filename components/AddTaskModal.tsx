import { useState } from "react";
import { useTagsStore } from "@/store/tags";
import { Task, WeekRoutine } from "@/types/routine";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TimePicker } from "@/components/TimePicker";
import { TagInput } from "@/components/TagInput";

type AddTaskModalProps = {
  routine: WeekRoutine;
  day: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRoutineChange: (routine: WeekRoutine) => void;
};

export const AddTaskModal = ({
  routine,
  day,
  open,
  onOpenChange,
  onRoutineChange,
}: AddTaskModalProps) => {
  const { tags: savedTags, addTag } = useTagsStore();
  const [newTask, setNewTask] = useState<Partial<Task>>({
    time: "",
    description: "",
    tags: [],
    completed: false,
  });

  const handleSubmit = () => {
    if (newTask.time && newTask.description) {
      onRoutineChange({
        ...routine,
        routine: {
          ...routine.routine,
          [day]: {
            ...routine.routine[day],
            tasks: [
              ...(routine.routine[day]?.tasks || []),
              { ...newTask, id: Date.now().toString() } as Task,
            ].sort((a, b) => a.time.localeCompare(b.time)),
          },
        },
      });
      setNewTask({ time: "", description: "", tags: [], completed: false });
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <TimePicker
                value={newTask.time || ""}
                onChange={(time) => setNewTask((prev) => ({ ...prev, time }))}
              />
            </div>
            <div className="col-span-2">
              <Input
                placeholder="Task description"
                value={newTask.description}
                onChange={(e) =>
                  setNewTask((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <TagInput
            tags={newTask.tags || []}
            onTagsChange={(tags) => setNewTask((prev) => ({ ...prev, tags }))}
            onAddTag={addTag}
            savedTags={savedTags}
          />
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Add Task</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
