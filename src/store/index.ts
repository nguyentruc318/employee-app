import { persist } from "zustand/middleware";
import { createAuthSlice, type AuthSlice } from "./slice/auth-slice";
import { create } from "zustand";

type StoreState = AuthSlice;

export const useAppStore = create<StoreState>()(
  persist(
    (...a) => ({
      ...createAuthSlice(...a),
    }),
    {
      name: "auth-storage",
    },
  ),
);
