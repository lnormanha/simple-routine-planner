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
  const { addRoutine } = useRoutinesStore();
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

    addRoutine(newRoutine);
    router.push("/");
  };

  const handleRoutineChange = (newRoutine: WeekRoutine) => {
    setRoutine(newRoutine);
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Create New Routine Template</h1>
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
