import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { TagsStore } from "./types";

export const useTagsStore = create<TagsStore>()(
  persist(
    (set) => ({
      tags: [],
      addTag: (tag: string) => set((state) => ({ tags: [...state.tags, tag] })),
      removeTag: (tag: string) =>
        set((state) => ({
          tags: state.tags.filter((t) => t !== tag),
        })),
      clearTags: () => set(() => ({ tags: [] })),
    }),
    {
      name: "tags-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
