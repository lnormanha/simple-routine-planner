import { WeekRoutine } from "@/types/routine";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type DeleteRoutineDialogProps = {
  routine: WeekRoutine;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => void;
};

export const DeleteRoutineDialog = ({
  routine,
  open,
  onOpenChange,
  onDelete,
}: DeleteRoutineDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Routine</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete "{routine.name}"? This action cannot
            be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            Delete Routine
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
