import { create } from "zustand";
import { ActivitiesStore } from "./types";
import { createJSONStorage, persist } from "zustand/middleware";

export const useActivitiesStore = create<ActivitiesStore>()(
  persist(
    (set) => ({
      activities: [],
      addActivity: (activity: string) =>
        set((state) => ({ activities: [...state.activities, activity] })),
      removeActivity: (activity: string) =>
        set((state) => ({
          activities: state.activities.filter((a) => a !== activity),
        })),
      clearActivities: () => set(() => ({ activities: [] })),
    }),
    {
      name: "activities-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
