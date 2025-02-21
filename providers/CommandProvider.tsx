"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useRoutinesStore } from "@/store/routines";

export const CommandProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();

  const { routines, updateRoutine, activeRoutine } = useRoutinesStore();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (action: () => void) => {
    setOpen(false);
    action();
  };

  return (
    <>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Routines">
            <CommandItem onSelect={() => handleSelect(() => router.push("/"))}>
              Current Routine
            </CommandItem>
            <CommandItem
              onSelect={() =>
                handleSelect(() => router.push("/create-template"))
              }
            >
              Create Routine Template
            </CommandItem>
            <CommandItem
              onSelect={() =>
                handleSelect(() =>
                  router.push(`/edit-template/${activeRoutine?.id}`)
                )
              }
            >
              Edit Active Routine
            </CommandItem>
            <CommandItem
              onSelect={() => handleSelect(() => router.push("/routines"))}
            >
              See All Routine Templates
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Goals">
            <CommandItem
              onSelect={() => handleSelect(() => router.push("/goals"))}
            >
              Weekly Goals
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
      {children}
    </>
  );
};
