"use client";

import { useRouter } from "next/navigation";
import { useRoutinesStore } from "@/store/routines";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Edit, Plus, Trash2, Check } from "lucide-react";
import { Visible } from "@/components/custom/Visible";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Card } from "@/components/ui/card";
import { RoutinePreviewCard } from "@/components/custom/Cards/RoutinePreviewCard";
import { format } from "date-fns";
import { useState } from "react";

export default function RoutinesPage() {
  const router = useRouter();
  const [routineToDelete, setRoutineToDelete] = useState<string | null>(null);
  const { routines, deleteRoutine, updateRoutine, setActiveRoutine } =
    useRoutinesStore();

  const today = format(new Date(), "EEEE").toLowerCase();

  const handleDeleteRoutine = (id: string) => {
    setRoutineToDelete(id);
  };

  const confirmDelete = () => {
    if (routineToDelete) {
      deleteRoutine(routineToDelete);
      setRoutineToDelete(null);
    }
  };

  const setDefaultRoutine = (routineId: string) => {
    // First, remove isDefault from all routines
    routines.forEach((routine) => {
      if (routine.isDefault) {
        updateRoutine({ ...routine, isDefault: false });
      }
    });

    // Set the new default routine
    const routine = routines.find((r) => r.id === routineId);
    if (routine) {
      updateRoutine({ ...routine, isDefault: true });
      setActiveRoutine(routine);
      router.push("/"); // Redirect to home page
    }
  };

  return (
    <div className="space-y-8 py-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Your Routines</h2>
          <p className="text-muted-foreground mt-1">
            Select a routine to make it your active schedule
          </p>
        </div>
        <Link href="/create-template">
          <Button size="lg" className="gap-2">
            <Plus className="h-5 w-5" /> Create New Routine
          </Button>
        </Link>
      </div>

      <Visible
        when={routines.length > 0}
        fallback={
          <div className="text-center py-20 bg-muted/50 rounded-lg">
            <h3 className="text-2xl font-semibold mb-2">No routines yet</h3>
            <p className="text-muted-foreground mb-6">
              Create your first routine to get started with organizing your day
            </p>
            <Link href="/create-template">
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Create New Routine
              </Button>
            </Link>
          </div>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {routines.map((routine) => (
            <Card
              key={routine.id}
              className={`p-4 ${
                routine.isDefault ? "ring-2 ring-primary" : ""
              }`}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold flex items-center gap-2">
                    {routine.name}
                    {routine.isDefault && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        Active
                      </span>
                    )}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {Object.values(routine.routine).reduce(
                      (acc, day) => acc + day.routineItems.length,
                      0
                    )}{" "}
                    activities,{" "}
                    {Object.values(routine.routine).reduce(
                      (acc, day) => acc + day.tasks.length,
                      0
                    )}{" "}
                    tasks
                  </p>
                </div>
                <div className="flex gap-2">
                  {!routine.isDefault && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setDefaultRoutine(routine.id)}
                      className="gap-2"
                    >
                      <Check className="h-4 w-4" />
                      Set Active
                    </Button>
                  )}
                  <Link href={`/edit-template/${routine.id}`}>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleDeleteRoutine(routine.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium text-muted-foreground mb-2">
                  Your Current Routine
                </h4>
                <RoutinePreviewCard
                  routineItems={routine.routine[today]?.routineItems || []}
                  tasks={routine.routine[today]?.tasks || []}
                />
              </div>
            </Card>
          ))}
        </div>
      </Visible>

      <AlertDialog
        open={!!routineToDelete}
        onOpenChange={() => setRoutineToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              routine and all of its data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
