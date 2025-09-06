import { useState, useEffect } from "react";
import { login, signup } from "../lib/api";
import { parseApiError } from "../lib/errors";
import { setLogoutHandler } from "../lib/axios";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("lumora_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    setLogoutHandler(handleLogout);
  }, []);

  const handleLogin = async (loginData) => {
    try {
      const response = await login(loginData);

      console.log(response);

      // He should send user login details along with token

      // const user = {
      //   id: response.id,
      //   name: response.profile.name,
      //   email: response.email,
      //   isPremium: response.subscription_type === "premium",
      // };

      const mockUser = {
        id: "1",
        name: "John Doe",
        email: loginData.email,
        isPremium: true,
      };
      setUser(mockUser);
      localStorage.setItem("lumora_user", JSON.stringify(mockUser));
      localStorage.setItem("access_token", response.access_token);

      return mockUser;
    } catch (err) {
      console.error("Login error:", err);
      setError(parseApiError(err, "Login failed. Please try again."));
      return null;
    }
  };

  const handleSignup = async ({ name, email, password }) => {
    try {
      const response = await signup({
        name,
        email,
        password,
        subscription_type: "premium",
      });

      const newUser = {
        id: response.id,
        name: response.profile.name,
        email: response.email,
        isPremium: response.subscription_type === "premium",
      };

      setUser(newUser);
      localStorage.setItem("lumora_user", JSON.stringify(newUser));
      localStorage.setItem("access_token", response.access_token);

      return newUser;
    } catch (err) {
      console.error("Signup error:", err);
      setError(parseApiError(err, "Signup failed. Please try again."));
      return null;
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("lumora_user");
    localStorage.removeItem("access_token");
  };

  return {
    user,
    error,
    handleLogin,
    handleSignup,
    handleLogout,
    setError,
  };
}
