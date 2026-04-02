import { persist } from "zustand/middleware";
import { createAuthSlice, type AuthSlice } from "./slice/auth-slice";
import { create } from "zustand";
import {
  createActivitySlice,
  type ActivitySlice,
} from "./slice/activities-slice";

type StoreState = AuthSlice & ActivitySlice;

export const useAppStore = create<StoreState>()(
  persist(
    (...a) => ({
      ...createAuthSlice(...a),
      ...createActivitySlice(...a),
    }),
    {
      name: "auth-storage",
    },
  ),
);
