import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { WeekRoutine } from "@/types/routine";
import { RoutinesStore } from "./types";

export const useRoutinesStore = create<RoutinesStore>()(
  persist(
    (set) => ({
      routines: [],
      activeRoutine: null,
      addRoutine: (routine: WeekRoutine) =>
        set((state) => ({ routines: [...state.routines, routine] })),
      updateRoutine: (updatedRoutine: WeekRoutine) =>
        set((state) => ({
          routines: state.routines.map((routine) =>
            routine.id === updatedRoutine.id ? updatedRoutine : routine
          ),
        })),
      deleteRoutine: (routineId: string) =>
        set((state) => ({
          routines: state.routines.filter(
            (routine) => routine.id !== routineId
          ),
        })),
      setActiveRoutine: (routine: WeekRoutine) =>
        set(() => ({ activeRoutine: routine })),
    }),
    {
      name: "routine-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
