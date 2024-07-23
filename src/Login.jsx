import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./context";
import { getToken } from "./api";
import CreateNewUser from "./CreateNewUser";

function Login() {
  const { auth } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.accessToken) {
      navigate('/');
    }
  }, [navigate, auth.accessToken]);

  const handleSubmit = (e) => {
    e.preventDefault();
    getToken({ auth, username, password });
  };

  return (
    <div className="p-5">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            className="form-control input-width"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            className="form-control input-width"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div className="form-group mt-3">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>

      <hr />

      <CreateNewUser />
    </div>
  );
}

export default Login;
