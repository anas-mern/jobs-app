import { useContext } from "react";
import { AuthContext } from "../context/auth";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import logo from '../images/logo.png'
export default function NavBar() {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const logout = () => {
    setAuth(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/register");
  };
  return (
    <nav className="w-75 rounded-bottom-3 m-auto bg-special soft-shadow d-flex justify-content-around align-items-center flex-wrap p-2">
      <div className="rounded-circle logo soft-shadow">
        <img src={logo} alt="Logo" />
      </div>
      {auth && (
        <div className="d-flex gap-4 align-items-center">
          <p className="m-0 text-white">
            {JSON.parse(localStorage.getItem("user")).username}, Welcome To Inkly
          </p>
          <Button variant="danger" onClick={logout}>
            Logout
          </Button>
        </div>
      )}
    </nav>
  );
}
