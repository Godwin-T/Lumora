import { axiosInstance, publicClient } from "./axios";

function saveToken(token) {
  localStorage.setItem("access_token", token);
}

// Free (anonymous) chat
export const sendMessageFree = async (msg) => {
  const response = await axiosInstance.post("/api/chat/anonymous", msg);
  return response.data;
};

// Premium (authenticated) chat
export const sendMessagePremium = async (msg) => {
  const response = await axiosInstance.post("/api/chat/premium", msg);
  return response.data;
};

export const signup = async (signupData) => {
  const response = await publicClient.post("/signup", signupData);
  const { access_token } = response.data;
  if (access_token) saveToken(access_token);
  return response.data;
};

export const login = async (loginData) => {
  const response = await publicClient.post(
    "/token",
    new URLSearchParams({
      grant_type: "password",
      username: loginData.username,
      password: loginData.password,
    }),
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
  );

  const { access_token } = response.data;
  if (access_token) saveToken(access_token);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("access_token");
};
