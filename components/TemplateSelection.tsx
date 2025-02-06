import { useRoutineStore } from "@/store/routineStore"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Edit, Plus } from "lucide-react"

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export function TemplateSelection() {
  const { routines } = useRoutineStore()

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Routine Templates</h1>
        <Link href="/create-template">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Create New Template
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {routines.map((routine) => (
          <Card key={routine.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle>{routine.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <p>
                  Routine Items: {Object.values(routine.routine).reduce((sum, day) => sum + day.routineItems.length, 0)}
                </p>
                <p>Chores: {Object.values(routine.routine).reduce((sum, day) => sum + day.chores.length, 0)}</p>
              </div>
              <Link href={`/edit-template/${routine.id}`}>
                <Button variant="outline" className="w-full">
                  <Edit className="mr-2 h-4 w-4" /> Edit Template
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

