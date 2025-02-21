import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

const colors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-gray-500",
];

interface ColorPickerProps {
  selectedColor: string;
  onColorChange: (color: string) => void;
}

export function ColorPicker({
  selectedColor,
  onColorChange,
}: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleColorChange = (color: string) => {
    onColorChange(color);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="w-6 h-6 rounded-full p-0"
        >
          <div className={`w-full h-full rounded-full ${selectedColor}`}></div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px]">
        <div className="grid grid-cols-4 gap-2">
          {colors.map((color) => (
            <Button
              key={color}
              className={`w-8 h-8 rounded-full ${color}`}
              onClick={() => handleColorChange(color)}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
