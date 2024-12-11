import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  email: string;
  nickname: string;
  type: string;
  exp: number;
  id: number;
}

export const isTokenValid = (token: string): boolean => {
  try {
    const decoded: { exp: number } = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp > currentTime;
  } catch (e) {
    console.error("Invalid token:", e);
    return false;
  }
};

export const getTypeUser = (): string => {
  const token = sessionStorage.getItem('token');
  if(!token)
    return "user";
  const decodedToken = jwtDecode<TokenPayload>(token);
  return decodedToken.type;
}

export const getEmailUser = (): string => {
  const token = sessionStorage.getItem('token');
  if(!token)
    return "";
  const decodedToken = jwtDecode<TokenPayload>(token);
  return decodedToken.email;
}

export const getIdUser = (): number => {
  const token = sessionStorage.getItem('token');
  if(!token)
    return 0;
  const decodedToken = jwtDecode<TokenPayload>(token);
  return decodedToken.id;
}