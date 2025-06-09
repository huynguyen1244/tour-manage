export const saveTokens = (userData: any) => {
  localStorage.setItem("accessToken", userData.accessToken);
  localStorage.setItem("refreshToken", userData.refreshToken);
  localStorage.setItem("user", JSON.stringify(userData));
};

export const getAccessToken = () => localStorage.getItem("accessToken");

export const clearTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
};
