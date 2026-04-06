import { jwtDecode } from "jwt-decode";
import type { AuthUser } from "../types/empolyee.type";

export const decodeToken = (token: string): AuthUser | null => {
  try {
    const user = jwtDecode<AuthUser>(token);
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};
