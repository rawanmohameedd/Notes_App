import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav style={{ display: "flex", justifyContent: "space-between", padding: "1rem" }}>
      <h3>Note App</h3>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;
