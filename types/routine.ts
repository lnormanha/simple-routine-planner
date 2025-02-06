export type RoutineItem = {
  id: string
  time: string
  activity: string
  color: string
  tags: string[]
}

export type Chore = {
  id: string
  time: string
  task: string
  completed: boolean
  tags: string[]
}

export type DayRoutine = {
  routineItems: RoutineItem[]
  chores: Chore[]
}

export type WeekRoutine = {
  id: string
  name: string
  routine: {
    [key: string]: DayRoutine
  }
}

