import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginUser, setLoggedUser } from "../reducers/loggedUserReducer";
import { setNotification } from "../reducers/notificationReducer";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Login = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    dispatch(setLoggedUser());
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      dispatch(loginUser(username, password));
      setUsername("");
      setPassword("");

      dispatch(
        setNotification({
          type: "success",
          text: `Logged in as ${username} successfully!`,
        }),
      );
    } catch (exception) {
      dispatch(
        setNotification({
          type: "error",
          text: exception,
        }),
      );
    }
  };

  return (
    <Form onSubmit={handleLogin}>
      <Form.Group className="mb-3">
        <Form.Label>username:</Form.Label>
        <Form.Control
          data-testid="inputUsername"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>password:</Form.Label>
        <Form.Control
          data-testid="inputPassword"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </Form.Group>
      <div className="text-center">
        <Button variant="primary" type="submit" data-testid="loginButton">
          Login
        </Button>
      </div>
    </Form>
  );
};

export default Login;
