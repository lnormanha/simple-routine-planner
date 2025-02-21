"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRoutinesStore } from "@/store/routines";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RoutineTemplate } from "@/components/RoutineTemplate";
import { RoutinePreviewCard } from "@/components/RoutinePreviewCard";
import type { WeekRoutine } from "@/types/routine";
import { format } from "date-fns";

export default function EditTemplate({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { updateRoutine, activeRoutine } = useRoutinesStore();
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

    const updatedRoutine = {
      ...routine,
      name: name.trim(),
    };

    updateRoutine(updatedRoutine);
    router.push("/");
  };

  const handleRoutineChange = (newRoutine: WeekRoutine) => {
    setRoutine(newRoutine);
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
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
        <RoutineTemplate
          routine={routine}
          onRoutineChange={handleRoutineChange}
        />
      </div>
    </div>
  );
}
