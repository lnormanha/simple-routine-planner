"use client";

import { useRouter } from "next/navigation";
import { useRoutinesStore } from "@/store/routines";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/custom/Header";
import { RoutineTemplate } from "@/components/custom/RoutineTemplate";
import { format } from "date-fns";
import { WeekRoutine } from "@/types/routine";

export default function RoutineDetail({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { routines, updateRoutine } = useRoutinesStore();
  const routine = routines.find((r) => r.id === params.id);

  if (!routine) {
    router.push("/");
    return null;
  }

  const handleRoutineChange = (updatedRoutine: WeekRoutine) => {
    updateRoutine(updatedRoutine);
  };

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <Header />

      <div className="bg-muted/30 rounded-lg p-4">
        <RoutineTemplate
          routine={routine}
          onRoutineChange={handleRoutineChange}
        />
      </div>
    </div>
  );
}
