import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TagInputProps {
  tags: string[]
  onTagsChange: (tags: string[]) => void
  savedTags: string[]
}

export function TagInput({ tags, onTagsChange, savedTags }: TagInputProps) {
  const [inputValue, setInputValue] = useState("")
  const [showNewTagInput, setShowNewTagInput] = useState(false)

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      onTagsChange([...tags, tag])
      setInputValue("")
      setShowNewTagInput(false)
    }
  }

  const removeTag = (tagToRemove: string) => {
    onTagsChange(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleTagChange = (value: string) => {
    if (value === "new") {
      setShowNewTagInput(true)
    } else {
      addTag(value)
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex space-x-2">
        <Select onValueChange={handleTagChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a tag" />
          </SelectTrigger>
          <SelectContent>
            {savedTags.map((tag) => (
              <SelectItem key={tag} value={tag}>
                {tag}
              </SelectItem>
            ))}
            <SelectItem value="new">Add new tag</SelectItem>
          </SelectContent>
        </Select>
        {showNewTagInput && (
          <>
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Add a new tag"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  addTag(inputValue)
                }
              }}
            />
            <Button onClick={() => addTag(inputValue)}>Add</Button>
          </>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge key={tag} variant="secondary">
            {tag}
            <Button variant="ghost" size="sm" className="ml-2 h-4 w-4 p-0" onClick={() => removeTag(tag)}>
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ))}
      </div>
    </div>
  )
}

