import { Clock, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { RoutineItem, Task, WeekRoutine } from "@/types/routine";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { EditActivityDialog } from "../../Dialogs/EditActivityDialog";
import { DeleteActivityDialog } from "../../Dialogs/DeleteActivityDialog";

type RoutineCardProps = {
  routine: WeekRoutine;
  day: string;
  items: RoutineItem[];
  tasks: Task[];
  onRoutineChange: (routine: WeekRoutine) => void;
};

export const RoutineCard = ({
  routine,
  day,
  items,
  tasks,
  onRoutineChange,
}: RoutineCardProps) => {
  const [editingActivity, setEditingActivity] = useState<RoutineItem | null>(
    null
  );
  const [deletingActivity, setDeletingActivity] = useState<RoutineItem | null>(
    null
  );

  const removeTask = (id: string) => {
    onRoutineChange({
      ...routine,
      routine: {
        ...routine.routine,
        [day]: {
          ...routine.routine[day],
          tasks: routine.routine[day].tasks.filter((task) => task.id !== id),
        },
      },
    });
  };

  const toggleTask = (id: string) => {
    onRoutineChange({
      ...routine,
      routine: {
        ...routine.routine,
        [day]: {
          ...routine.routine[day],
          tasks: routine.routine[day].tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
          ),
        },
      },
    });
  };

  return (
    <Card className="border-none shadow-none">
      <CardContent className="space-y-4">
        {items.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              Activities
            </h3>
            {items.map((item) => (
              <div
                key={item.id}
                className={cn(
                  "flex items-center gap-4 p-3 rounded-lg",
                  "bg-primary/5 hover:bg-primary/10 group transition-colors"
                )}
              >
                <div className="w-20 text-sm font-medium">
                  <Clock className="h-3 w-3 inline mr-1 text-muted-foreground" />
                  {item.time}
                </div>
                <div className="flex-1">
                  <div
                    className={cn(
                      "font-medium rounded-md px-2 py-1",
                      item.color
                    )}
                  >
                    {item.activity}
                  </div>
                  {item.tags?.length > 0 && (
                    <div className="flex gap-1 mt-1">
                      {item.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-[10px] px-1 py-0"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setEditingActivity(item)}>
                      <Pencil className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setDeletingActivity(item)}>
                      <Trash2 className="h-4 w-4 mr-2 text-destructive" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        )}

        {tasks.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Tasks</h3>
            {tasks.map((task) => (
              <div
                key={task.id}
                className={cn(
                  "flex items-center gap-4 p-3 rounded-lg",
                  "bg-primary/5 hover:bg-primary/10 group transition-colors"
                )}
              >
                <div className="w-20 text-sm font-medium">
                  <Clock className="h-3 w-3 inline mr-1 text-muted-foreground" />
                  {task.time}
                </div>
                <div className="flex-1 flex items-center gap-2">
                  <Checkbox
                    id={task.id}
                    checked={task.completed}
                    onCheckedChange={() => toggleTask(task.id)}
                    className="data-[state=checked]:bg-primary"
                  />
                  <label
                    htmlFor={task.id}
                    className={`flex-1 ${
                      task.completed ? "line-through text-muted-foreground" : ""
                    }`}
                  >
                    {task.description}
                  </label>
                  {task.tags?.length > 0 && (
                    <div className="flex gap-1">
                      {task.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-[10px] px-1 py-0"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                  onClick={() => removeTask(task.id)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {items.length === 0 && tasks.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No activities or tasks for this day
          </div>
        )}

        {editingActivity && (
          <EditActivityDialog
            routine={routine}
            day={day}
            activity={editingActivity}
            open={!!editingActivity}
            onOpenChange={(open) => !open && setEditingActivity(null)}
            onRoutineChange={onRoutineChange}
          />
        )}

        {deletingActivity && (
          <DeleteActivityDialog
            routine={routine}
            day={day}
            activity={deletingActivity}
            open={!!deletingActivity}
            onOpenChange={(open) => !open && setDeletingActivity(null)}
            onRoutineChange={onRoutineChange}
          />
        )}
      </CardContent>
    </Card>
  );
};
