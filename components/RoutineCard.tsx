import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import type { RoutineItem, Chore } from "@/types/routine"
import { Clock, AlertCircle, Tag } from "lucide-react"

interface RoutineCardProps {
  day: string
  date: string
  routineItems: RoutineItem[]
  chores: Chore[]
  onChoreToggle: (choreId: string) => void
  isCurrentDay: boolean
}

export function RoutineCard({ day, date, routineItems, chores, onChoreToggle, isCurrentDay }: RoutineCardProps) {
  const isEmpty = routineItems.length === 0 && chores.length === 0

  return (
    <Card
      className={`w-[300px] flex-shrink-0 ${isCurrentDay ? "shadow-md shadow-primary/20" : "hover:shadow-sm hover:shadow-primary/10"} transition-shadow duration-300`}
    >
      <CardHeader className={`pb-2 ${isCurrentDay ? "bg-primary/10" : ""}`}>
        <CardTitle>{day}</CardTitle>
        <p className="text-sm text-muted-foreground">{date}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
            <AlertCircle className="w-8 h-8 mb-2" />
            <p>No items or chores for this day</p>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Routine Items</h3>
              {routineItems.map((item) => (
                <div key={item.id} className="flex flex-col space-y-1 bg-secondary/50 rounded-md p-2">
                  <div className="flex items-center space-x-2">
                    <div className={`w-4 h-4 rounded-full ${item.color} flex-shrink-0`}></div>
                    <Badge variant="secondary" className="w-16 justify-center">
                      <Clock className="mr-1 h-3 w-3" />
                      {item.time}
                    </Badge>
                    <span className="font-medium">{item.activity}</span>
                  </div>
                  {item.tags.length > 0 && (
                    <div className="flex items-center space-x-1 ml-6">
                      <Tag className="h-3 w-3" />
                      {item.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Chores</h3>
              {chores.map((chore) => (
                <div key={chore.id} className="flex flex-col space-y-1 bg-secondary/50 rounded-md p-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox checked={chore.completed} onCheckedChange={() => onChoreToggle(chore.id)} />
                    <Badge variant="secondary" className="w-16 justify-center">
                      <Clock className="mr-1 h-3 w-3" />
                      {chore.time}
                    </Badge>
                    <span className={`font-medium ${chore.completed ? "line-through text-muted-foreground" : ""}`}>
                      {chore.task}
                    </span>
                  </div>
                  {chore.tags.length > 0 && (
                    <div className="flex items-center space-x-1 ml-6">
                      <Tag className="h-3 w-3" />
                      {chore.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

