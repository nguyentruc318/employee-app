import { jwtDecode } from "jwt-decode";
import type { GoogleUser } from "../types/empolyee.type";

export const decodeToken = (token: string): GoogleUser | null => {
  try {
    const user = jwtDecode<GoogleUser>(token);
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};
