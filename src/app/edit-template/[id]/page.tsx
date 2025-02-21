"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRoutinesStore } from "@/store/routines";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RoutineTemplate } from "@/components/custom/RoutineTemplate";
import type { WeekRoutine } from "@/types/routine";

export default function EditTemplate({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { updateRoutine, activeRoutine, setActiveRoutine } = useRoutinesStore();
  const [routine, setRoutine] = useState<WeekRoutine | null>(null);
  const [name, setName] = useState("");

  console.log({ activeRoutine, params });

  useEffect(() => {
    if (activeRoutine?.id === params.id) {
      setRoutine(activeRoutine);
      setName(activeRoutine.name);
    } else {
      router.push("/");
    }
  }, [params.id, activeRoutine, router]);

  if (!routine) {
    return null;
  }

  const handleSave = () => {
    if (!name.trim()) {
      return;
    }

    const updatedRoutine: WeekRoutine = {
      ...routine,
      name: name.trim(),
      isDefault: true,
    };

    updateRoutine(updatedRoutine);
    setActiveRoutine(updatedRoutine);

    router.push("/");
  };

  const handleRoutineChange = (newRoutine: WeekRoutine) => {
    setRoutine(newRoutine);
  };

  return (
    <div className="space-y-8 py-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Edit Routine Template</h1>
        <Button onClick={handleSave}>Save and Exit</Button>
      </div>

      <div className="flex gap-4 items-center">
        <Input
          placeholder="Template Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setRoutine((prev) =>
              prev ? { ...prev, name: e.target.value } : null
            );
          }}
          className="max-w-md"
        />
      </div>

      {/* Routine Template */}
      <div className="bg-muted/30 rounded-lg p-4">
        <div>
          <h2>Routine Preview</h2>
        </div>
        <RoutineTemplate
          routine={routine}
          onRoutineChange={handleRoutineChange}
        />
      </div>
    </div>
  );
}
