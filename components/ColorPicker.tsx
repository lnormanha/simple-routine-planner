import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const colors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-gray-500",
]

interface ColorPickerProps {
  selectedColor: string
  onColorChange: (color: string) => void
}

export function ColorPicker({ selectedColor, onColorChange }: ColorPickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="w-10 h-10 rounded-full p-0">
          <div className={`w-full h-full rounded-full ${selectedColor}`}></div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px]">
        <div className="grid grid-cols-4 gap-2">
          {colors.map((color) => (
            <Button key={color} className={`w-8 h-8 rounded-full ${color}`} onClick={() => onColorChange(color)} />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

