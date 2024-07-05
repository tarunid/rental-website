import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Login logic
      const response = await fetch('https://rental-website-e57q.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.status === 200) {
        // Login successful
        setErrorMessage('');
        console.log('Login successful!');

        // Redirect to the home page
        history('/home');
      } else {
        // Login failed
        const data = await response.json();
        setErrorMessage(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Network error during authentication:', error);
      setErrorMessage('Network error. Please try again later.');
    }

    setUsername('');
    setPassword('');
  };

  return (
    <div className='signup' style={{ backgroundImage: 'url("img1.avif")' }}>
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit">Login</button>
      </form>
      <p>
        Not yet registered? <Link to="/signup">Signup</Link>
      </p>
    </div>
    </div>
  );
};

export default LoginPage;
