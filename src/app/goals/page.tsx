"use client";

import { useGoalsStore } from "@/store/goals";
import { Card, CardContent } from "@/components/ui/card";
import { WeeklyGoals } from "@/components/custom/WeeklyGoals";

export default function GoalsPage() {
  const { getAllWeeks } = useGoalsStore();
  const weeks = getAllWeeks();

  return (
    <div className="space-y-8 py-4">
      <div className="flex items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold">Your Weekly Goals</h2>
          <p className="text-muted-foreground mt-1">
            Manage and track your goals
          </p>
        </div>
      </div>

      <div className="space-y-8">
        <div>
          <h2 className="text-lg font-semibold mb-4">Current Week</h2>
          <WeeklyGoals />
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Historical Goals</h2>
          <div className="space-y-4">
            {weeks.slice(1).map((week) => (
              <WeeklyGoals key={week.toISOString()} weekStartDate={week} />
            ))}
            {weeks.length <= 1 && (
              <Card>
                <CardContent className="py-8">
                  <p className="text-center text-muted-foreground">
                    No historical goals yet. Start by adding goals for this
                    week!
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
