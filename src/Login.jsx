import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "./context";
import { getToken } from "./api"; // Adjust this import to match your actual file
import CreateNewUser from "./CreateNewUser";
import { useNavigate } from "react-router-dom";

function Login() {
  const { accessToken, setAccessToken } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate('/');
    }
  }, [navigate, accessToken]);

  const submit = async () => {
    try {
      console.log('login accessToken ', accessToken)
      const token = await getToken({ username, password });
      setAccessToken(token); // Update context with new token
    } catch (error) {
      console.error('Login error: ', error);
    }
  };

  return (
    <div className="p-5">
      <h1>Login</h1>
      <div>
        <div>Username:</div>
        <input
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      <div>
        <div>Password:</div>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>
      <div style={{ marginTop: 20 }}>
        <button onClick={submit}>Submit</button>
      </div>
      <hr />
      <CreateNewUser />
    </div>
  );
}

export default Login;
