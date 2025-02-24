import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { WeeklyGoal } from "@/types/goals";
import { startOfWeek, isSameWeek } from "date-fns";

interface GoalsState {
  goals: WeeklyGoal[];
  addGoal: (description: string) => void;
  toggleGoal: (id: string) => void;
  removeGoal: (id: string) => void;
  getCurrentWeekGoals: () => WeeklyGoal[];
  getWeekGoals: (weekStartDate: Date) => WeeklyGoal[];
  getAllWeeks: () => Date[];
}

export const useGoalsStore = create<GoalsState>()(
  persist(
    (set, get) => ({
      goals: [],
      addGoal: (description: string) => {
        const newGoal: WeeklyGoal = {
          id: `${Date.now()}`,
          description,
          completed: false,
          createdAt: new Date().toISOString(),
          weekStartDate: startOfWeek(new Date()).toISOString(),
        };
        set((state) => ({
          goals: [...state.goals, newGoal],
        }));
      },
      toggleGoal: (id: string) => {
        set((state) => ({
          goals: state.goals.map((goal) =>
            goal.id === id ? { ...goal, completed: !goal.completed } : goal
          ),
        }));
      },
      removeGoal: (id: string) => {
        set((state) => ({
          goals: state.goals.filter((goal) => goal.id !== id),
        }));
      },
      getCurrentWeekGoals: () => {
        const currentDate = new Date();
        return get().goals.filter((goal) =>
          isSameWeek(new Date(goal.weekStartDate), currentDate)
        );
      },
      getWeekGoals: (weekStartDate: Date) => {
        return get().goals.filter((goal) =>
          isSameWeek(new Date(goal.weekStartDate), weekStartDate)
        );
      },
      getAllWeeks: () => {
        const weeks = new Set<string>();
        get().goals.forEach((goal) => {
          weeks.add(startOfWeek(new Date(goal.weekStartDate)).toISOString());
        });

        return Array.from(weeks)
          .map((week) => new Date(week))
          .sort((a, b) => b.getTime() - a.getTime()); // Sort by most recent first
      },
    }),
    {
      name: "weekly-goals",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
