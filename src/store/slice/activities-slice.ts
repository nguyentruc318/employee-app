import type { StateCreator } from "zustand";

type ActivityType = "add" | "update" | "delete";

export interface Activity {
  id: string;
  type: ActivityType;
  name: string;
  time: number;
}
export interface ActivitySlice {
  activities: Activity[];
  addActivity: (activity: Omit<Activity, "id" | "time">) => void;
  // deleteActivity:(id:string)=>void;
  // updateActivity:(id:string,activity:Activity)=>void;
}
export const createActivitySlice: StateCreator<ActivitySlice> = (set) => ({
  activities: [],
  addActivity: (activity) =>
    set((state) => ({
      activities: [...state.activities, { ...activity, id: Date.now().toString(), time: Date.now() }],
    })),
});