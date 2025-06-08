import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { BiLogOut } from "react-icons/bi";

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-purple-600">Note App</h1>
      <button
        onClick={handleLogout}
        className="flex flex-row items-center space-x-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition"
      >
        <BiLogOut />
        <span>Logout</span>
      </button>
    </nav>
  );
};

export default Navbar;
