export interface ActivitiesStoreState {
  activities: string[];
}

export interface ActivitiesStoreActions {
  addActivity: (activity: string) => void;
  removeActivity: (activity: string) => void;
}

export type ActivitiesStore = ActivitiesStoreState & ActivitiesStoreActions;
