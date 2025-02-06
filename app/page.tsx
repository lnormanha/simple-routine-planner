"use client"

import { useState } from "react"
import { useRoutineStore } from "@/store/routineStore"
import { RoutineCard } from "@/components/RoutineCard"
import { ThemeToggle } from "@/components/ThemeToggle"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Edit, Plus, ArrowLeft } from "lucide-react"
import { format, addDays, startOfWeek, isSameDay } from "date-fns"

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

export default function Home() {
  const [selectedRoutine, setSelectedRoutine] = useState<string | null>(null)
  const { routines, updateRoutine } = useRoutineStore()

  const toggleChore = (day: string, choreId: string) => {
    const routine = routines.find((r) => r.id === selectedRoutine)
    if (routine) {
      const updatedRoutine = {
        ...routine,
        routine: {
          ...routine.routine,
          [day]: {
            ...routine.routine[day],
            chores: routine.routine[day].chores.map((chore) =>
              chore.id === choreId ? { ...chore, completed: !chore.completed } : chore,
            ),
          },
        },
      }
      updateRoutine(updatedRoutine)
    }
  }

  const selectedRoutineData = routines.find((r) => r.id === selectedRoutine)

  const today = new Date()
  const weekStart = startOfWeek(today)

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Routine Planner</h1>
        <ThemeToggle />
      </div>
      {!selectedRoutine ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Your Routines</h2>
            <Link href="/create-template">
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Create New Routine
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {routines.map((routine) => (
              <Card
                key={routine.id}
                className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
                onClick={() => setSelectedRoutine(routine.id)}
              >
                <CardHeader className="pb-2">
                  <CardTitle>{routine.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <p>
                      Routine Items:{" "}
                      {Object.values(routine.routine).reduce((sum, day) => sum + day.routineItems.length, 0)}
                    </p>
                    <p>Chores: {Object.values(routine.routine).reduce((sum, day) => sum + day.chores.length, 0)}</p>
                  </div>
                  <Link href={`/edit-template/${routine.id}`}>
                    <Button variant="outline" className="w-full">
                      <Edit className="mr-2 h-4 w-4" /> Edit Routine
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <>
          <Button onClick={() => setSelectedRoutine(null)} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Routines
          </Button>
          {selectedRoutineData && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">{selectedRoutineData.name}</h2>
              <div className="flex overflow-x-auto pb-4 space-x-4">
                {daysOfWeek.map((day, index) => {
                  const currentDate = addDays(weekStart, index)
                  return (
                    <RoutineCard
                      key={day}
                      day={day}
                      date={format(currentDate, "MMM d")}
                      routineItems={selectedRoutineData.routine[day]?.routineItems || []}
                      chores={selectedRoutineData.routine[day]?.chores || []}
                      onChoreToggle={(choreId) => toggleChore(day, choreId)}
                      isCurrentDay={isSameDay(currentDate, today)}
                    />
                  )
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

