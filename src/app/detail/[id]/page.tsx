"use client";

import { useRouter } from "next/navigation";
import { useRoutinesStore } from "@/store/routines";
import { RoutineTemplate } from "@/components/custom/RoutineTemplate";
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
    <div className="space-y-8 py-4">
      <div className="bg-muted/30 rounded-lg p-4">
        <RoutineTemplate
          routine={routine}
          onRoutineChange={handleRoutineChange}
        />
      </div>
    </div>
  );
}
