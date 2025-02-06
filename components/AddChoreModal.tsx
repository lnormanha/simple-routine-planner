import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TagInput } from "@/components/TagInput"
import { TimePicker } from "@/components/TimePicker"
import { Checkbox } from "@/components/ui/checkbox"
import type { Chore } from "@/types/routine"

interface AddChoreModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (chore: Chore, days: string[]) => void
  savedActivities: string[]
  savedTags: string[]
}

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

export function AddChoreModal({ isOpen, onClose, onAdd, savedActivities, savedTags }: AddChoreModalProps) {
  const [newChore, setNewChore] = useState<Partial<Chore>>({ time: "", task: "", tags: [] })
  const [selectedDays, setSelectedDays] = useState<string[]>([])
  const [showNewChoreInput, setShowNewChoreInput] = useState(false)

  const handleAdd = () => {
    if (newChore.time && newChore.task && selectedDays.length > 0) {
      onAdd({ ...newChore, id: Date.now().toString(), completed: false } as Chore, selectedDays)
      setNewChore({ time: "", task: "", tags: [] })
      setSelectedDays([])
      setShowNewChoreInput(false)
      onClose()
    }
  }

  const handleChoreChange = (value: string) => {
    if (value === "new") {
      setShowNewChoreInput(true)
      setNewChore((prev) => ({ ...prev, task: "" }))
    } else {
      setNewChore((prev) => ({ ...prev, task: value }))
      setShowNewChoreInput(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Chore</DialogTitle>
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
            <Label htmlFor="choreTime">Time</Label>
            <TimePicker value={newChore.time} onChange={(time) => setNewChore((prev) => ({ ...prev, time }))} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="chore">Chore</Label>
            <Select value={newChore.task} onValueChange={handleChoreChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a chore" />
              </SelectTrigger>
              <SelectContent>
                {savedActivities.map((activity) => (
                  <SelectItem key={activity} value={activity}>
                    {activity}
                  </SelectItem>
                ))}
                <SelectItem value="new">Add new chore</SelectItem>
              </SelectContent>
            </Select>
            {showNewChoreInput && (
              <Input
                id="newChore"
                type="text"
                placeholder="Enter new chore"
                value={newChore.task}
                onChange={(e) => setNewChore((prev) => ({ ...prev, task: e.target.value }))}
                className="mt-2"
              />
            )}
          </div>
          <div className="space-y-2">
            <Label>Tags</Label>
            <TagInput
              tags={newChore.tags || []}
              onTagsChange={(tags) => setNewChore((prev) => ({ ...prev, tags }))}
              savedTags={savedTags}
            />
          </div>
          <Button onClick={handleAdd}>Add Chore</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

