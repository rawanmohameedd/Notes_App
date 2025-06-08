import { useState } from "react";
import { useNavigate } from "react-router-dom";
;
import API from "../services/apis";
import { useAuth } from "../auth/useAuth";

const LoginPage = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { username, password });
      setToken(res.data.token);
      navigate("/notes");
    } catch (err) {
        console.error(err);
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Login</button>
      <p>
        Don't have an account? <a href="/register">Register</a>
      </p>
    </form>
  );
};

export default LoginPage;
