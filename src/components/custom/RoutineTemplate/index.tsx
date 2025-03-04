"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useRoutinesStore } from "@/store/routines";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { RoutineCard } from "@/components/custom/Cards/RoutineCard";
import { AddActivityModal } from "@/components/custom/Dialogs/AddActivityDialog";
import { AddTaskDialog } from "@/components/custom/Dialogs/AddTaskDialog";
import { DeleteRoutineDialog } from "@/components/custom/Dialogs/DeleteRoutineDialog";
import { WeekRoutine } from "@/types/routine";
import { DAYS_OF_WEEK } from "@/constants/week";
import Link from "next/link";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type RoutineTemplateProps = {
  routine: WeekRoutine;
  onRoutineChange?: (routine: WeekRoutine) => void;
};

export const RoutineTemplate = ({
  routine,
  onRoutineChange,
}: RoutineTemplateProps) => {
  const router = useRouter();
  const today = format(new Date(), "EEEE").toLowerCase();

  const [selectedDay, setSelectedDay] = useState<string>(today);
  const [showAddItem, setShowAddItem] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [showDeleteRoutine, setShowDeleteRoutine] = useState(false);
  const { updateRoutine, deleteRoutine } = useRoutinesStore();

  const handleRoutineChange = (newRoutine: WeekRoutine) => {
    if (onRoutineChange) {
      onRoutineChange(newRoutine);
    } else {
      updateRoutine(newRoutine);
    }
  };

  const handleDeleteRoutine = () => {
    deleteRoutine(routine.id);
    router.push("/");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">
            {routine.name || "New Routine"}
          </h1>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setShowAddItem(true)}>
              Add Activity
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setShowAddTask(true)}>
              Add Task
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setShowDeleteRoutine(true)}
              className="text-destructive"
            >
              Delete Routine
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Tabs value={selectedDay} onValueChange={setSelectedDay}>
        <TabsList className="grid grid-cols-7">
          {DAYS_OF_WEEK.map((day) => (
            <TabsTrigger
              key={day}
              value={day}
              className="capitalize data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {day.slice(0, 3)}
            </TabsTrigger>
          ))}
        </TabsList>

        {DAYS_OF_WEEK.map((day) => (
          <TabsContent key={day} value={day} className="mt-6">
            <RoutineCard
              routine={routine}
              day={day}
              items={routine.routine[day]?.routineItems || []}
              tasks={routine.routine[day]?.tasks || []}
              onRoutineChange={handleRoutineChange}
            />
          </TabsContent>
        ))}
      </Tabs>

      <AddActivityModal
        routine={routine}
        day={selectedDay}
        open={showAddItem}
        onOpenChange={setShowAddItem}
        onRoutineChange={handleRoutineChange}
      />

      <AddTaskDialog
        routine={routine}
        day={selectedDay}
        open={showAddTask}
        onOpenChange={setShowAddTask}
        onRoutineChange={handleRoutineChange}
      />

      <DeleteRoutineDialog
        routine={routine}
        open={showDeleteRoutine}
        onOpenChange={setShowDeleteRoutine}
        onDelete={handleDeleteRoutine}
      />
    </div>
  );
};
