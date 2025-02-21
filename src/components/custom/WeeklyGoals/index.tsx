import { useState } from "react";
import { useGoalsStore } from "@/store/goals";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Plus, ChevronRight } from "lucide-react";
import { format, startOfWeek, endOfWeek } from "date-fns";
import Link from "next/link";

interface WeeklyGoalsProps {
  weekStartDate?: Date;
  showAllGoals?: boolean;
}

export const WeeklyGoals = ({
  weekStartDate,
  showAllGoals = false,
}: WeeklyGoalsProps) => {
  const [newGoal, setNewGoal] = useState("");
  const { getCurrentWeekGoals, getWeekGoals, addGoal, toggleGoal, removeGoal } =
    useGoalsStore();

  const isCurrentWeek = !weekStartDate;
  const weekStart = weekStartDate || startOfWeek(new Date());
  const weekEnd = endOfWeek(weekStart);
  const weekRange = `${format(weekStart, "MMM d")} - ${format(
    weekEnd,
    "MMM d"
  )}`;

  const goals = isCurrentWeek ? getCurrentWeekGoals() : getWeekGoals(weekStart);
  const completedGoals = goals.filter((goal) => goal.completed).length;

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGoal.trim()) {
      addGoal(newGoal.trim());
      setNewGoal("");
    }
  };

  return (
    <Card className="p-6">
      <CardHeader className="px-0 pb-4">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Weekly Goals</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{weekRange}</p>
          </div>
          <div className="text-sm text-muted-foreground">
            {completedGoals} of {goals.length} completed
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-0 space-y-4">
        {isCurrentWeek && (
          <form onSubmit={handleAddGoal} className="flex gap-2">
            <Input
              placeholder="Add a new goal for this week..."
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
            />
            <Button type="submit" size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </form>
        )}

        <div className="space-y-2">
          {goals.map((goal) => (
            <div
              key={goal.id}
              className="flex items-center gap-2 group hover:bg-muted/50 p-2 rounded-lg"
            >
              <Checkbox
                checked={goal.completed}
                onCheckedChange={() => toggleGoal(goal.id)}
                className="data-[state=checked]:bg-primary"
                disabled={!isCurrentWeek}
              />
              <span
                className={`flex-1 ${
                  goal.completed ? "line-through text-muted-foreground" : ""
                }`}
              >
                {goal.description}
              </span>
              {isCurrentWeek && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeGoal(goal.id)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              )}
            </div>
          ))}
          {goals.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">
              No goals set for this week yet. Add some goals to track your
              progress!
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-0">
        {showAllGoals && (
          <Link href="/goals">
            <Button variant="ghost" size="sm" className="gap-2">
              View all goals
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};
