import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner"; // Using your existing sonner setup

export const useLogin = () => {
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      // Call the blog's local API, which proxies to the main site
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error("Invalid credentials");

      const { user, token } = await response.json();

      // Store auth data
      localStorage.setItem("site_token", token);
      localStorage.setItem("site_user", JSON.stringify(user));

      toast.success("Logged in successfully!");
      navigate("/"); // Redirect to home or stay on page
    } catch (error) {
      toast.error(error.message);
    }
  };

  return { login };
};