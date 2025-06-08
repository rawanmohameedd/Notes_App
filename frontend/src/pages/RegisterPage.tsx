import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/apis";
import { FaUser } from "react-icons/fa";
import Form from "../components/Form";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", { username, password });
      if (res) {
        alert("Registration successful");
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-white">
      <div className="bg-white p-10 rounded-3xl shadow-lg w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-gradient-to-br from-pink-500 to-purple-500 p-4 rounded-full text-white text-3xl mb-4">
            <FaUser />
          </div>
          <h2 className="text-2xl font-bold mb-1">Create Account</h2>
          <p className="text-gray-500">Join us to start organizing your notes</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <Form
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 rounded-lg shadow-md hover:opacity-90 transition"
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/" className="text-purple-600 font-medium hover:underline">
            Sign in here
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;