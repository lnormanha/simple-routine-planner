export type WeeklyGoal = {
  id: string;
  description: string;
  completed: boolean;
  createdAt: string;
  weekStartDate: string; // ISO string of the week's start date
};

export type WeeklyGoals = {
  goals: WeeklyGoal[];
};
