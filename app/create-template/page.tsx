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
import { format, startOfWeek, addDays, isSameDay } from "date-fns"

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

export default function CreateTemplate() {
  const router = useRouter()
  const { addRoutine } = useRoutineStore()
  const [templateName, setTemplateName] = useState("")
  const [currentRoutine, setCurrentRoutine] = useState<WeekRoutine>({
    id: Date.now().toString(),
    name: "",
    routine: Object.fromEntries(daysOfWeek.map((day) => [day, { routineItems: [], chores: [] }])),
  })
  const [isAddRoutineItemModalOpen, setIsAddRoutineItemModalOpen] = useState(false)
  const [isAddChoreModalOpen, setIsAddChoreModalOpen] = useState(false)
  const [savedTags, setSavedTags] = useState<string[]>([])
  const [savedActivities, setSavedActivities] = useState<string[]>([])

  useEffect(() => {
    // Load saved tags and activities from localStorage
    const storedTags = localStorage.getItem("savedTags")
    const storedActivities = localStorage.getItem("savedActivities")
    if (storedTags) setSavedTags(JSON.parse(storedTags))
    if (storedActivities) setSavedActivities(JSON.parse(storedActivities))
  }, [])

  const updateTemplateName = (name: string) => {
    setTemplateName(name)
    setCurrentRoutine((prev) => ({ ...prev, name }))
  }

  const addRoutineItem = (item: RoutineItem, days: string[]) => {
    setCurrentRoutine((prev) => {
      const updatedRoutine = { ...prev }
      days.forEach((day) => {
        if (!updatedRoutine.routine[day]) {
          updatedRoutine.routine[day] = { routineItems: [], chores: [] }
        }
        updatedRoutine.routine[day] = {
          ...updatedRoutine.routine[day],
          routineItems: [...updatedRoutine.routine[day].routineItems, item],
        }
      })
      return updatedRoutine
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

  const addChore = (chore: Chore, days: string[]) => {
    setCurrentRoutine((prev) => {
      const updatedRoutine = { ...prev }
      days.forEach((day) => {
        if (!updatedRoutine.routine[day]) {
          updatedRoutine.routine[day] = { routineItems: [], chores: [] }
        }
        updatedRoutine.routine[day] = {
          ...updatedRoutine.routine[day],
          chores: [...updatedRoutine.routine[day].chores, chore],
        }
      })
      return updatedRoutine
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
    setCurrentRoutine((prev) => ({
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
    }))
  }

  const saveAndExit = () => {
    if (templateName) {
      addRoutine(currentRoutine)
      router.push("/")
    } else {
      alert("Please enter a template name before saving.")
    }
  }

  const today = new Date()
  const weekStart = startOfWeek(today)

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Create New Routine Template</h1>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Template Name"
          value={templateName}
          onChange={(e) => updateTemplateName(e.target.value)}
          className="text-lg font-semibold"
        />
      </div>
      <div className="mb-4 flex space-x-2">
        <Button onClick={() => setIsAddRoutineItemModalOpen(true)}>Add Routine Item</Button>
        <Button onClick={() => setIsAddChoreModalOpen(true)}>Add Chore</Button>
      </div>
      <div className="flex overflow-x-auto pb-4 space-x-4">
        {daysOfWeek.map((day, index) => {
          const currentDate = addDays(weekStart, index)
          return (
            <RoutineCard
              key={day}
              day={day}
              date={format(currentDate, "MMM d")}
              routineItems={currentRoutine.routine[day]?.routineItems || []}
              chores={currentRoutine.routine[day]?.chores || []}
              onChoreToggle={(choreId) => toggleChore(day, choreId)}
              isCurrentDay={isSameDay(currentDate, today)}
            />
          )
        })}
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

