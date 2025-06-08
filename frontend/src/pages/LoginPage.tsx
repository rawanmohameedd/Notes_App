import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/apis";
import { useAuth } from "../auth/useAuth";
import Form from "../components/Form";

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
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-white to-blue-50 px-4">
      <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8 space-y-6">
        <div className="flex justify-center">
          <div className="bg-gradient-to-br from-purple-500 to-indigo-500 p-3 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m2 6H7a2 2 0 01-2-2V8a2 2 0 012-2h3l2-2h4l2 2h3a2 2 0 012 2v8a2 2 0 01-2 2z" />
            </svg>
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-500">Sign in to access your notes</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <Form
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />
          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold rounded-md hover:opacity-90 transition"
          >
            Sign In
          </button>
        </form>
        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="/register" className="text-purple-600 font-medium hover:underline">
            Create one here
          </a>
        </p>
        <p className="text-center text-xs text-gray-400 pt-2">Secure • Fast • Reliable</p>
      </div>
    </div>
  );
};

export default LoginPage;