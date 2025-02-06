import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ColorPicker } from "@/components/ColorPicker"
import { TagInput } from "@/components/TagInput"
import { TimePicker } from "@/components/TimePicker"
import { Checkbox } from "@/components/ui/checkbox"
import type { RoutineItem } from "@/types/routine"

interface AddRoutineItemModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (item: RoutineItem, days: string[]) => void
  savedActivities: string[]
  savedTags: string[]
}

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

export function AddRoutineItemModal({ isOpen, onClose, onAdd, savedActivities, savedTags }: AddRoutineItemModalProps) {
  const [newItem, setNewItem] = useState<Partial<RoutineItem>>({
    time: "",
    activity: "",
    color: "bg-blue-500",
    tags: [],
  })
  const [selectedDays, setSelectedDays] = useState<string[]>([])
  const [showNewActivityInput, setShowNewActivityInput] = useState(false)

  const handleAdd = () => {
    if (newItem.time && newItem.activity && selectedDays.length > 0) {
      onAdd({ ...newItem, id: Date.now().toString() } as RoutineItem, selectedDays)
      setNewItem({ time: "", activity: "", color: "bg-blue-500", tags: [] })
      setSelectedDays([])
      setShowNewActivityInput(false)
      onClose()
    }
  }

  const handleActivityChange = (value: string) => {
    if (value === "new") {
      setShowNewActivityInput(true)
      setNewItem((prev) => ({ ...prev, activity: "" }))
    } else {
      setNewItem((prev) => ({ ...prev, activity: value }))
      setShowNewActivityInput(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Routine Item</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Days</Label>
            <div className="flex flex-wrap gap-2">
              {daysOfWeek.map((day) => (
                <div key={day} className="flex items-center">
                  <Checkbox
                    id={`day-${day}`}
                    checked={selectedDays.includes(day)}
                    onCheckedChange={(checked) => {
                      setSelectedDays((prev) => (checked ? [...prev, day] : prev.filter((d) => d !== day)))
                    }}
                  />
                  <Label htmlFor={`day-${day}`} className="ml-2">
                    {day}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="itemTime">Time</Label>
            <TimePicker value={newItem.time} onChange={(time) => setNewItem((prev) => ({ ...prev, time }))} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="activity">Activity</Label>
            <Select value={newItem.activity} onValueChange={handleActivityChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select an activity" />
              </SelectTrigger>
              <SelectContent>
                {savedActivities.map((activity) => (
                  <SelectItem key={activity} value={activity}>
                    {activity}
                  </SelectItem>
                ))}
                <SelectItem value="new">Add new activity</SelectItem>
              </SelectContent>
            </Select>
            {showNewActivityInput && (
              <Input
                id="newActivity"
                type="text"
                placeholder="Enter new activity"
                value={newItem.activity}
                onChange={(e) => setNewItem((prev) => ({ ...prev, activity: e.target.value }))}
                className="mt-2"
              />
            )}
          </div>
          <div className="space-y-2">
            <Label>Color</Label>
            <ColorPicker
              selectedColor={newItem.color || "bg-blue-500"}
              onColorChange={(color) => setNewItem((prev) => ({ ...prev, color }))}
            />
          </div>
          <div className="space-y-2">
            <Label>Tags</Label>
            <TagInput
              tags={newItem.tags || []}
              onTagsChange={(tags) => setNewItem((prev) => ({ ...prev, tags }))}
              savedTags={savedTags}
            />
          </div>
          <Button onClick={handleAdd}>Add Routine Item</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

