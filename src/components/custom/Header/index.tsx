import { Calendar, Command } from "lucide-react";
import { ThemeToggle } from "../ThemeToggle";
import Link from "next/link";
import { Label } from "@/components/ui/label";

export const Header = () => {
  return (
    <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <Calendar className="h-6 w-6" />
            <span className="text-xl font-semibold">Routine Planner</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/routines"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Routines
            </Link>
            <Link
              href="/goals"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Weekly Goals
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center ">
            <Command size={16} className="text-muted-foreground" />
            <Label className="text-sm text-muted-foreground">
              +K for command menu
            </Label>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};
