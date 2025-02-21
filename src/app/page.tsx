"use client";

import { useRoutinesStore } from "@/store/routines";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, ChevronRight } from "lucide-react";
import { Header } from "@/components/custom/Header";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { RoutinePreviewCard } from "@/components/custom/Cards/RoutinePreviewCard";
import { WeeklyGoals } from "@/components/custom/WeeklyGoals";
import { format, addDays } from "date-fns";

export default function Home() {
  const { routines, updateRoutine } = useRoutinesStore();
  const defaultRoutine = routines.find((r) => r.isDefault);

  // Get today's and tomorrow's day names
  const today = format(new Date(), "EEEE").toLowerCase();
  const tomorrow = format(addDays(new Date(), 1), "EEEE").toLowerCase();

  const handleTaskComplete = (taskId: string) => {
    if (!defaultRoutine) return;

    const updatedRoutine = {
      ...defaultRoutine,
      routine: {
        ...defaultRoutine.routine,
        [today]: {
          ...defaultRoutine.routine[today],
          tasks: defaultRoutine.routine[today].tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
          ),
        },
      },
    };

    updateRoutine(updatedRoutine);
  };

  if (!defaultRoutine) {
    return (
      <div className="container mx-auto p-4 min-h-screen">
        <Header />
        <div className="flex gap-4 pt-4">
          <div className="flex flex-[0.7] flex-col text-center py-20">
            <h2 className="text-2xl font-semibold mb-2">Welcome!</h2>
            <p className="text-muted-foreground mb-6">
              Get started by creating a routine or selecting an existing one as
              your default schedule.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/create-template">
                <Button size="lg">
                  <Plus className="mr-2 h-4 w-4" /> Create New Routine
                </Button>
              </Link>
              <Link href="/routines">
                <Button variant="outline" size="lg">
                  View All Routines
                </Button>
              </Link>
            </div>
          </div>
          {/* Weekly Goals */}
          <div className="flex-[0.3]">
            <WeeklyGoals />
          </div>
        </div>
      </div>
    );
  }

  const todayRoutine = defaultRoutine.routine[today];
  const tomorrowRoutine = defaultRoutine.routine[tomorrow];

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <Header />
      <div className="space-y-8 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold">Your Current Routine</h2>
            <p className="text-muted-foreground mt-1">
              Following {defaultRoutine.name}
            </p>
          </div>
          <div className="flex gap-2">
            <Link href={`/detail/${defaultRoutine.id}`}>
              <Button variant="secondary" size="lg">
                View Full Schedule
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
            <Link href="/routines">
              <Button variant="outline" size="lg">
                Change Routine
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Schedule */}
          <Card className="p-6 ring-2 ring-primary/10 shadow-lg shadow-primary/10">
            <CardHeader className="px-0 pb-4">
              <CardTitle className="flex items-center gap-2">
                <span className="capitalize">{today}</span>
                <span className="text-xs bg-primary/20 text-primary font-medium px-2 py-1 rounded-full">
                  Today
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <RoutinePreviewCard
                routineItems={todayRoutine?.routineItems || []}
                tasks={todayRoutine?.tasks || []}
                onTaskComplete={handleTaskComplete}
                isCurrentDay
              />
            </CardContent>
          </Card>

          {/* Tomorrow's Schedule */}
          <Card className="p-6">
            <CardHeader className="px-0 pb-4">
              <CardTitle className="flex items-center gap-2">
                <span className="capitalize">{tomorrow}</span>
                <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                  Tomorrow
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <RoutinePreviewCard
                routineItems={tomorrowRoutine?.routineItems || []}
                tasks={tomorrowRoutine?.tasks || []}
              />
            </CardContent>
          </Card>

          {/* Weekly Goals */}
          <Card className="p-6">
            <CardHeader className="px-0 pb-4">
              <div className="flex justify-between items-center">
                <CardTitle>Weekly Goals</CardTitle>
                <Link href="/goals">
                  <Button variant="ghost" size="sm" className="gap-2">
                    View all goals
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="px-0">
              <WeeklyGoals />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
