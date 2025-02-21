"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useRoutinesStore } from "@/store/routines";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { WeekRoutine } from "@/types/routine";
import { RoutineTemplate } from "@/components/custom/RoutineTemplate";
import { Card } from "@/components/ui/card";

export default function CreateTemplate() {
  const router = useRouter();
  const { addRoutine, routines, setActiveRoutine } = useRoutinesStore();
  const [name, setName] = useState("");
  const [routine, setRoutine] = useState<WeekRoutine>({
    id: Date.now().toString(),
    name: "",
    routine: {
      monday: { routineItems: [], tasks: [] },
      tuesday: { routineItems: [], tasks: [] },
      wednesday: { routineItems: [], tasks: [] },
      thursday: { routineItems: [], tasks: [] },
      friday: { routineItems: [], tasks: [] },
      saturday: { routineItems: [], tasks: [] },
      sunday: { routineItems: [], tasks: [] },
    },
  });

  const handleSave = () => {
    if (!name.trim()) {
      return;
    }

    const newRoutine = {
      ...routine,
      name: name.trim(),
    };

    if (routines.length === 0) {
      setActiveRoutine(newRoutine);
    }

    addRoutine(newRoutine);
    router.push("/");
  };

  const handleRoutineChange = (newRoutine: WeekRoutine) => {
    setRoutine(newRoutine);
  };

  return (
    <div className="space-y-8 py-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Create New Routine Template</h2>
          <p className="text-muted-foreground mt-1">
            Create a new routine template to use in your routine
          </p>
        </div>
        <Button onClick={handleSave}>Save and Exit</Button>
      </div>

      <div className="flex gap-4 items-center">
        <Input
          placeholder="Template Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setRoutine((prev) => ({ ...prev, name: e.target.value }));
          }}
          className="max-w-md"
        />
      </div>

      {/* Preview Card */}
      <Card className="p-4 bg-muted/50">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <h3 className="font-semibold">{name || "Untitled Routine"}</h3>
            <p className="text-sm text-muted-foreground">
              {Object.values(routine.routine).reduce(
                (acc, day) => acc + day.routineItems.length,
                0
              )}{" "}
              activities,{" "}
              {Object.values(routine.routine).reduce(
                (acc, day) => acc + day.tasks.length,
                0
              )}{" "}
              tasks
            </p>
          </div>
        </div>
      </Card>

      {/* Routine Template */}
      <div className="bg-muted/30 rounded-lg p-4">
        <RoutineTemplate
          routine={routine}
          onRoutineChange={handleRoutineChange}
        />
      </div>
    </div>
  );
}
