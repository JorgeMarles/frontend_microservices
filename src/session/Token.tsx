import { jwtDecode } from "jwt-decode";

export const isTokenValid = (token: string): boolean => {
    try {
      const decoded: { exp: number } = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      console.log(decoded.exp, currentTime);
      return decoded.exp > currentTime;
    } catch (e) {
      console.error("Invalid token:", e);
      return false;
    }
  };