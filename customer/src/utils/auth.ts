// utils/auth.js
export const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("accessToken");
};

export const hasRole = (requiredRole: any) => {
  const user = getUserFromLocalStorage();
  return user?.role === requiredRole;
};
