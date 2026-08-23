import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth";
import apiLinkv1 from "../apiLink";

export default function AuthForm(props) {
  const [msg, setMsg] = useState("");
  const [MyLink, setMyLink] = useState(null);
  useEffect(() => {
    if (props.type === "Register") {
      setMsg("Already Have An Account");
      setMyLink(<Link to="/login">Login</Link>);
    } else if (props.type === "Login") {
      setMsg("Don't Have An Account");
      setMyLink(<Link to="/register">Register</Link>);
    }
  }, [props.type]);
  const { setAuth } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [usernameErrMsg, setUsernameErrMsg] = useState("");
  const [emailErrMsg, setEmailErrMsg] = useState("");
  const [passErrMsg, setPassErrMsg] = useState("");
  const submit = async (e) => {
    e.preventDefault();

    // Clear old messages
    setUsernameErrMsg("");
    setEmailErrMsg("");
    setPassErrMsg("");

    try {
      const body = { email, password };
      if (username) body.username = username;

      const res = await axios.post(
        `${apiLinkv1}/auth/${props.type.toLowerCase()}`,
        body,
      );

      const newAuth = { user: res.data.user, token: res.data.token };
      setAuth(newAuth);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/");
    } catch (error) {
      const msg = error?.response?.data?.message || "Something went wrong";

      if (msg.toLowerCase().includes("username")) {
        setUsernameErrMsg(msg);
      } else if (msg.toLowerCase().includes("email")) {
        setEmailErrMsg(msg);
      } else if (msg.toLowerCase().includes("password")) {
        setPassErrMsg(msg);
      } else {
        // Fallback error
        alert(msg);
      }
    }
  };

  return (
    <div className="fullscreen-center bg-dark" style={{ height: "100vh" }}>
      <div className="soft-shadow w-50 bg-black text-white p-4 rounded-4">
        <h1 className="text-center mb-4">{props.type}</h1>
        <Form onSubmit={submit}>
          {props.type === "Register" ? (
            <Form.Group className="d-flex flex-column flex-md-row gap-3 align-items-start mb-3">
              <Form.Label className="w-35">UserName</Form.Label>
              <Form.Control
                type="text"
                value={username}
                className="text-white bg-special"
                required
                onChange={(e) => setUsername(e.target.value)}
              ></Form.Control>
            </Form.Group>
          ) : (
            ""
          )}
          <p className="text-danger p-1">{usernameErrMsg}</p>
          <Form.Group className="d-flex  flex-column flex-md-row gap-3 align-items-start mb-3">
            <Form.Label className="w-35">Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              required
              className="text-white bg-special"
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <p className="text-danger p-1">{emailErrMsg}</p>
          <Form.Group className="d-flex flex-column flex-md-row gap-3 align-items-start mb-3">
            <Form.Label className="w-35">Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              required
              className="text-white bg-special"
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <p className="text-danger p-1">{passErrMsg}</p>
          <Button variant="primary" className="mb-3" type="submit">
            {props.type}
          </Button>
        </Form>
        <div className="d-flex flex-column flex-md-row gap-2">
          <p className="auth-message">{msg}</p>
          {MyLink}
        </div>
      </div>
    </div>
  );
}
