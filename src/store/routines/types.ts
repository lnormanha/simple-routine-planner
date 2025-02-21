import { WeekRoutine } from "@/types/routine";

export interface RoutinesStoreState {
  routines: WeekRoutine[];
  activeRoutine: WeekRoutine | null;
}

export interface RoutinesStoreActions {
  addRoutine: (routine: WeekRoutine) => void;
  updateRoutine: (updatedRoutine: WeekRoutine) => void;
  deleteRoutine: (routineId: string) => void;
  setActiveRoutine: (routine: WeekRoutine) => void;
}

export type RoutinesStore = RoutinesStoreState & RoutinesStoreActions;
