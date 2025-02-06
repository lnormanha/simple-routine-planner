import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { WeekRoutine } from "@/types/routine"

interface RoutineState {
  routines: WeekRoutine[]
  addRoutine: (routine: WeekRoutine) => void
  updateRoutine: (updatedRoutine: WeekRoutine) => void
  deleteRoutine: (routineId: string) => void
}

export const useRoutineStore = create<RoutineState>()(
  persist(
    (set) => ({
      routines: [],
      addRoutine: (routine) => set((state) => ({ routines: [...state.routines, routine] })),
      updateRoutine: (updatedRoutine) =>
        set((state) => ({
          routines: state.routines.map((routine) => (routine.id === updatedRoutine.id ? updatedRoutine : routine)),
        })),
      deleteRoutine: (routineId) =>
        set((state) => ({
          routines: state.routines.filter((routine) => routine.id !== routineId),
        })),
    }),
    {
      name: "routine-storage",
    },
  ),
)

