import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useAuth() {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  useEffect(() => {
    if (!user) {
      // no user → redirect to login
      navigate("/login");
    }
  }, [user, navigate]);

  return user ? JSON.parse(user) : null;
}
