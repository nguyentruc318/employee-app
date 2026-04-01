import type { StateCreator } from "zustand";
import type { GoogleUser } from "../../types/empolyee.type";

export interface AuthSlice {
  user: GoogleUser | null;
  login: (userData: GoogleUser) => void;
  logout: () => void;
}
export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  user: null,
  login: (userData) => set({ user: userData }),
  logout: () => set({ user: null }),
});
