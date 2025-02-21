export type RoutineItem = {
  id: string;
  time: string;
  activity: string;
  color: string;
  tags: string[];
};

export type Task = {
  id: string;
  time: string;
  description: string;
  completed: boolean;
  tags: string[];
};

export type DayRoutine = {
  routineItems: RoutineItem[];
  tasks: Task[];
};

export type WeekRoutine = {
  id: string;
  name: string;
  description?: string;
  isDefault?: boolean;
  routine: {
    [key: string]: DayRoutine;
  };
};
