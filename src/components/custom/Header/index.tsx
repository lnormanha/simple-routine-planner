import { Calendar, Search, Settings } from "lucide-react";
import { ThemeToggle } from "../ThemeToggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
              href="/goals"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Weekly Goals
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5 text-muted-foreground" />
          </Button>
        </div>
      </div>
    </div>
  );
};
