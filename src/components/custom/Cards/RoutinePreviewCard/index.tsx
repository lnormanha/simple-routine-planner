import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { RoutineItem, Task } from "@/types/routine";

import { Checkbox } from "@/components/ui/checkbox";

type RoutinePreviewCardProps = {
  routineItems: RoutineItem[];
  tasks: Task[];
  onTaskComplete?: (taskId: string) => void;
  isCurrentDay?: boolean;
};

export const RoutinePreviewCard = ({
  routineItems,
  tasks,
  onTaskComplete,
  isCurrentDay = false,
}: RoutinePreviewCardProps) => {
  // Combine and sort routine items and tasks by time
  const allItems = [
    ...routineItems.map((item) => ({ ...item, type: "routine" as const })),
    ...tasks.map((task) => ({ ...task, type: "task" as const })),
  ].sort((a, b) => a.time.localeCompare(b.time));

  return (
    <div className={`space-y-2 ${isCurrentDay ? "relative" : ""}`}>
      {allItems.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-3 p-2 rounded-lg relative z-10"
        >
          <div className="w-12 text-sm text-muted-foreground">{item.time}</div>
          {item.type === "routine" ? (
            <div className="flex flex-1 flex-col gap-2">
              <div
                className={cn(
                  "flex items-center gap-2 rounded-md px-2 py-1 w-full",
                  item.color && item.color
                )}
              >
                <span>{item.activity}</span>
              </div>
              {item.tags.length > 0 && (
                <div className="flex gap-1">
                  {item.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="flex-1 flex items-center gap-2">
              <Checkbox
                id={item.id}
                checked={item.completed}
                onCheckedChange={() => onTaskComplete?.(item.id)}
                className="data-[state=checked]:bg-primary"
              />
              <label
                htmlFor={item.id}
                className={`flex-1 ${
                  item.completed ? "line-through text-muted-foreground" : ""
                }`}
              >
                {item.description}
              </label>
              {item.tags.length > 0 && (
                <div className="flex gap-1">
                  {item.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
      {allItems.length === 0 && (
        <div className="text-center text-muted-foreground py-4">
          No activities or tasks scheduled
        </div>
      )}
    </div>
  );
};
