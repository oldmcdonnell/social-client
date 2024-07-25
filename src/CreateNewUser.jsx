import React, { useState } from "react";
import { createUser } from './api';

const CreateNewUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createUser({ username, password, firstName, lastName });
      if (response.success) {
        setUsername('');
        setPassword('');
        setFirstName('');
        setLastName('');
        setMessage('User created successfully!');
      } else {
        setMessage('Error creating user.');
      }
    } catch (error) {
      console.log('ERROR: ', error);
      setMessage('Error creating user.');
    }
  };

  return (
    <div>
      <h1>Create New User</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="new-username">Username:</label>
          <input
            type="text"
            id="new-username"
            className="form-control input-width"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>

        <div className="form-group">
          <label htmlFor="new-password">Password:</label>
          <input
            type="password"
            id="new-password"
            className="form-control input-width"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div className="form-group">
          <label htmlFor="first-name">First Name:</label>
          <input
            type="text"
            id="first-name"
            className="form-control input-width"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
        </div>

        <div className="form-group">
          <label htmlFor="last-name">Last Name:</label>
          <input
            type="text"
            id="last-name"
            className="form-control input-width"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
        </div>

        <div className="form-group mt-3">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default CreateNewUser;
