"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useRoutineStore } from "@/store/routineStore"
import { RoutineCard } from "@/components/RoutineCard"
import { AddRoutineItemModal } from "@/components/AddRoutineItemModal"
import { AddChoreModal } from "@/components/AddChoreModal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { RoutineItem, Chore, WeekRoutine } from "@/types/routine"

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

export default function EditTemplate({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { routines, updateRoutine } = useRoutineStore()
  const [currentRoutine, setCurrentRoutine] = useState<WeekRoutine | null>(null)
  const [isAddRoutineItemModalOpen, setIsAddRoutineItemModalOpen] = useState(false)
  const [isAddChoreModalOpen, setIsAddChoreModalOpen] = useState(false)
  const [savedTags, setSavedTags] = useState<string[]>([])
  const [savedActivities, setSavedActivities] = useState<string[]>([])

  useEffect(() => {
    const routine = routines.find((r) => r.id === params.id)
    if (routine) {
      setCurrentRoutine(routine)
    } else {
      router.push("/")
    }

    // Load saved tags and activities from localStorage
    const storedTags = localStorage.getItem("savedTags")
    const storedActivities = localStorage.getItem("savedActivities")
    if (storedTags) setSavedTags(JSON.parse(storedTags))
    if (storedActivities) setSavedActivities(JSON.parse(storedActivities))
  }, [params.id, routines, router])

  if (!currentRoutine) {
    return <div>Loading...</div>
  }

  const updateTemplateName = (name: string) => {
    setCurrentRoutine((prev) => (prev ? { ...prev, name } : null))
  }

  const addRoutineItem = (item: RoutineItem, day: string) => {
    setCurrentRoutine((prev) => {
      if (!prev) return null
      return {
        ...prev,
        routine: {
          ...prev.routine,
          [day]: {
            ...prev.routine[day],
            routineItems: [...prev.routine[day].routineItems, item],
          },
        },
      }
    })
    // Save new activity and tags
    if (!savedActivities.includes(item.activity)) {
      const updatedActivities = [...savedActivities, item.activity]
      setSavedActivities(updatedActivities)
      localStorage.setItem("savedActivities", JSON.stringify(updatedActivities))
    }
    const newTags = item.tags.filter((tag) => !savedTags.includes(tag))
    if (newTags.length > 0) {
      const updatedTags = [...savedTags, ...newTags]
      setSavedTags(updatedTags)
      localStorage.setItem("savedTags", JSON.stringify(updatedTags))
    }
  }

  const addChore = (chore: Chore, day: string) => {
    setCurrentRoutine((prev) => {
      if (!prev) return null
      return {
        ...prev,
        routine: {
          ...prev.routine,
          [day]: {
            ...prev.routine[day],
            chores: [...prev.routine[day].chores, chore],
          },
        },
      }
    })
    // Save new task and tags
    if (!savedActivities.includes(chore.task)) {
      const updatedActivities = [...savedActivities, chore.task]
      setSavedActivities(updatedActivities)
      localStorage.setItem("savedActivities", JSON.stringify(updatedActivities))
    }
    const newTags = chore.tags.filter((tag) => !savedTags.includes(tag))
    if (newTags.length > 0) {
      const updatedTags = [...savedTags, ...newTags]
      setSavedTags(updatedTags)
      localStorage.setItem("savedTags", JSON.stringify(updatedTags))
    }
  }

  const toggleChore = (day: string, choreId: string) => {
    setCurrentRoutine((prev) => {
      if (!prev) return null
      return {
        ...prev,
        routine: {
          ...prev.routine,
          [day]: {
            ...prev.routine[day],
            chores: prev.routine[day].chores.map((chore) =>
              chore.id === choreId ? { ...chore, completed: !chore.completed } : chore,
            ),
          },
        },
      }
    })
  }

  const saveAndExit = () => {
    if (currentRoutine.name) {
      updateRoutine(currentRoutine)
      router.push("/")
    } else {
      alert("Please enter a template name before saving.")
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Routine Template</h1>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Template Name"
          value={currentRoutine.name}
          onChange={(e) => updateTemplateName(e.target.value)}
        />
      </div>
      <div className="mb-4 flex space-x-2">
        <Button onClick={() => setIsAddRoutineItemModalOpen(true)}>Add Routine Item</Button>
        <Button onClick={() => setIsAddChoreModalOpen(true)}>Add Chore</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {daysOfWeek.map((day) => (
          <RoutineCard
            key={day}
            day={day}
            date=""
            routineItems={currentRoutine.routine[day]?.routineItems || []}
            chores={currentRoutine.routine[day]?.chores || []}
            onChoreToggle={(choreId) => toggleChore(day, choreId)}
          />
        ))}
      </div>
      <Button onClick={saveAndExit} className="mt-4">
        Save and Exit
      </Button>
      <AddRoutineItemModal
        isOpen={isAddRoutineItemModalOpen}
        onClose={() => setIsAddRoutineItemModalOpen(false)}
        onAdd={addRoutineItem}
        savedActivities={savedActivities}
        savedTags={savedTags}
      />
      <AddChoreModal
        isOpen={isAddChoreModalOpen}
        onClose={() => setIsAddChoreModalOpen(false)}
        onAdd={addChore}
        savedActivities={savedActivities}
        savedTags={savedTags}
      />
    </div>
  )
}

