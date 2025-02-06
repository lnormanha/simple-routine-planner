"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import type { WeekRoutine } from "@/types/routine"

type RoutineContextType = {
  routines: WeekRoutine[]
  setRoutines: React.Dispatch<React.SetStateAction<WeekRoutine[]>>
}

const RoutineContext = createContext<RoutineContextType | undefined>(undefined)

export const useRoutine = () => {
  const context = useContext(RoutineContext)
  if (!context) {
    throw new Error("useRoutine must be used within a RoutineProvider")
  }
  return context
}

export const RoutineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [routines, setRoutines] = useState<WeekRoutine[]>([])

  return <RoutineContext.Provider value={{ routines, setRoutines }}>{children}</RoutineContext.Provider>
}

