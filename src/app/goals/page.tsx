"use client";

import { useGoalsStore } from "@/store/goals";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { WeeklyGoals } from "@/components/custom/WeeklyGoals";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/custom/Header";

export default function GoalsPage() {
  const { getAllWeeks } = useGoalsStore();
  const weeks = getAllWeeks();

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <Header />
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Weekly Goals</h1>
      </div>

      <div className="space-y-8">
        {/* Current Week */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Current Week</h2>
          <WeeklyGoals />
        </div>

        {/* Historical Goals */}
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
