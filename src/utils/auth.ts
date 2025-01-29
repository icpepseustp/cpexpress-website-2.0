// Authentication and cookie management utilities

// Check if code is running on the client-side
const isClient = () => typeof window !== "undefined";

// Check if user has a valid session
export const checkSession = (): boolean => {
  if (!isClient()) return false;
  const sessionToken = getCookie("sessionToken");
  return !!sessionToken;
};

// Get user session data
export const getSessionUser = () => {
  if (!isClient() || !checkSession()) return null;
  
  return {
    userID: getCookie("uniqueID"),
    username: getCookie("username"),
    sessionToken: getCookie("sessionToken"),
  };
};

// Cookie utility functions
export const setCookie = (name: string, value: string, days: number): void => {
  if (!isClient()) return;
  
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/; SameSite=Lax`;
};

export const getCookie = (name: string): string | undefined => {
  if (!isClient()) return undefined;
  
  const cookies = document.cookie.split("; ");
  const cookie = cookies.find((c) => c.startsWith(`${name}=`));
  return cookie ? cookie.split("=")[1] : undefined;
};

export const clearSession = (): void => {
  if (!isClient()) return;
  
  document.cookie = "sessionToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  document.cookie = "userID=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
};