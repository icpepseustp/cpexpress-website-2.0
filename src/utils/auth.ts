// Authentication and cookie management utilities

// Check if user has a valid session
export const checkSession = (): boolean => {
  const sessionToken = getCookie('sessionToken');
  const userID = getCookie('userID');
  const username = getCookie('username');
  
  return !!(sessionToken && userID && username);
};

// Get user session data
export const getSessionUser = () => {
  if (!checkSession()) return null;
  
  return {
    userID: getCookie('userID'),
    username: getCookie('username'),
    sessionToken: getCookie('sessionToken')
  };
};

// Cookie utility functions
export const setCookie = (name: string, value: string, days: number = 1): void => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/; SameSite=Lax`;
};

export const getCookie = (name: string): string | undefined => {
  const cookies = document.cookie.split('; ');
  const cookie = cookies.find(c => c.startsWith(`${name}=`));
  return cookie ? cookie.split('=')[1] : undefined;
};

export const clearSession = (): void => {
  // Set cookies to expire immediately
  document.cookie = 'sessionToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
  document.cookie = 'userID=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
  document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
};
