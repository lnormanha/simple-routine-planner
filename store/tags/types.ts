export interface TagsStoreState {
  tags: string[];
}

export interface TagsStoreActions {
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
  clearTags: () => void;
}

export type TagsStore = TagsStoreState & TagsStoreActions;
