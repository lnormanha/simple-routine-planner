"use client"

import { useState } from "react"
import { useRoutine } from "@/contexts/RoutineContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { type RoutineItem, Chore } from "@/types/routine"

type RoutineTemplateProps = {
  routineId: string
  day: string
}

export const RoutineTemplate: React.FC<RoutineTemplateProps> = ({ routineId, day }) => {
  const { routines, setRoutines } = useRoutine()
  const [newItem, setNewItem] = useState<Partial<RoutineItem>>({ time: "", activity: "" })
  const [newChore, setNewChore] = useState("")

  const routine = routines.find((r) => r.id === routineId)

  const addItem = () => {
    if (newItem.time && newItem.activity) {
      setRoutines((prev) =>
        prev.map((r) => {
          if (r.id === routineId) {
            return {
              ...r,
              routine: {
                ...r.routine,
                [day]: {
                  ...r.routine[day],
                  routineItems: [
                    ...(r.routine[day]?.routineItems || []),
                    { ...newItem, id: Date.now().toString() } as RoutineItem,
                  ],
                },
              },
            }
          }
          return r
        }),
      )
      setNewItem({ time: "", activity: "" })
    }
  }

  const removeItem = (id: string) => {
    setRoutines((prev) =>
      prev.map((r) => {
        if (r.id === routineId) {
          return {
            ...r,
            routine: {
              ...r.routine,
              [day]: {
                ...r.routine[day],
                routineItems: r.routine[day]?.routineItems?.filter((item) => item.id !== id) || [],
              },
            },
          }
        }
        return r
      }),
    )
  }

  const addChore = () => {
    if (newChore) {
      setRoutines((prev) =>
        prev.map((r) => {
          if (r.id === routineId) {
            return {
              ...r,
              routine: {
                ...r.routine,
                [day]: {
                  ...r.routine[day],
                  chores: [
                    ...(r.routine[day]?.chores || []),
                    { id: Date.now().toString(), task: newChore, completed: false },
                  ],
                },
              },
            }
          }
          return r
        }),
      )
      setNewChore("")
    }
  }

  const removeChore = (id: string) => {
    setRoutines((prev) =>
      prev.map((r) => {
        if (r.id === routineId) {
          return {
            ...r,
            routine: {
              ...r.routine,
              [day]: {
                ...r.routine[day],
                chores: r.routine[day]?.chores?.filter((chore) => chore.id !== id) || [],
              },
            },
          }
        }
        return r
      }),
    )
  }

  const toggleChore = (id: string) => {
    setRoutines((prev) =>
      prev.map((r) => {
        if (r.id === routineId) {
          return {
            ...r,
            routine: {
              ...r.routine,
              [day]: {
                ...r.routine[day],
                chores:
                  r.routine[day]?.chores?.map((chore) =>
                    chore.id === id ? { ...chore, completed: !chore.completed } : chore,
                  ) || [],
              },
            },
          }
        }
        return r
      }),
    )
  }

  if (!routine) return null

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{day}</h3>
      <div className="space-y-2">
        <h4 className="text-md font-semibold">Routine Items</h4>
        {routine.routine[day]?.routineItems?.map((item) => (
          <div key={item.id} className="flex items-center space-x-2">
            <span>{item.time}</span>
            <span>{item.activity}</span>
            <Button variant="destructive" size="sm" onClick={() => removeItem(item.id)}>
              Remove
            </Button>
          </div>
        ))}
        <div className="flex space-x-2">
          <Input
            type="time"
            value={newItem.time}
            onChange={(e) => setNewItem((prev) => ({ ...prev, time: e.target.value }))}
          />
          <Input
            type="text"
            placeholder="Activity"
            value={newItem.activity}
            onChange={(e) => setNewItem((prev) => ({ ...prev, activity: e.target.value }))}
          />
          <Button onClick={addItem}>Add</Button>
        </div>
      </div>
      <div className="space-y-2">
        <h4 className="text-md font-semibold">Chores</h4>
        {routine.routine[day]?.chores?.map((chore) => (
          <div key={chore.id} className="flex items-center space-x-2">
            <Checkbox checked={chore.completed} onCheckedChange={() => toggleChore(chore.id)} />
            <span className={chore.completed ? "line-through" : ""}>{chore.task}</span>
            <Button variant="destructive" size="sm" onClick={() => removeChore(chore.id)}>
              Remove
            </Button>
          </div>
        ))}
        <div className="flex space-x-2">
          <Input type="text" placeholder="New chore" value={newChore} onChange={(e) => setNewChore(e.target.value)} />
          <Button onClick={addChore}>Add Chore</Button>
        </div>
      </div>
    </div>
  )
}

