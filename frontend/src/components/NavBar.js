import { useContext } from "react";
import { AuthContext } from "../context/auth";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const logout = () => {
    setAuth(null);
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate("/register");
  };
  return (
    <nav className="d-flex justify-content-around align-items-center flex-wrap p-2">
      <div className="logo">
        <img src="./logo.jpg" alt="Logo" />
      </div>
      {auth && (
        <div className="d-flex gap-4 align-items-center">
          <p className="m-0">Hello, {JSON.parse(localStorage.getItem('user')).username}</p>
          <Button variant="danger" onClick={logout}>
            Logout
          </Button>
        </div>
      )}
    </nav>
  );
}
