import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./LoginPage.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate(); // Use useNavigate for programmatic navigation

  const toggleForm = () => {
    setIsSignup(!isSignup);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate signup form
    if (isSignup) {
      if (!email || !password || !confirmPassword) {
        toast.error('All fields are required', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }
      if (password !== confirmPassword) {
        toast.error('Passwords do not match', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }
    }

    // Validate login form
    if (!isSignup && (!email || !password)) {
      toast.error('Please enter your email and password', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    const url = isSignup ? 'http://localhost:5000/signup' : 'http://localhost:5000/login';
    const body = isSignup
      ? { email, password, confirm_password: confirmPassword }
      : { email, password };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      console.log(data.message);
      if (!isSignup) {
        navigate("/"); // Redirect to home page after successful login
      } else {
        toast.success(data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="login-container">
      <ToastContainer />
      <h2 className="text-center">{isSignup ? "Sign Up" : "Log In"}</h2>
      <form onSubmit={handleSubmit} className="login-form">
        {isSignup && (
          <>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Set password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Re-enter Password:</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                placeholder="Repeat password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </>
        )}
        {!isSignup && (
          <>
            <div className="form-group">
              <label htmlFor="loginEmail">Email:</label>
              <input
                type="email"
                className="form-control"
                id="loginEmail"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="loginPassword">Password:</label>
              <input
                type="password"
                className="form-control"
                id="loginPassword"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </>
        )}
        <button type="submit" className="btn-orange">
          {isSignup ? "Sign Up" : "Login"}
        </button>
        {isSignup ? (
          <p onClick={toggleForm} style={{ cursor: "pointer", marginTop: "10px" }}>
            Already have an account? <span>Log in</span>
          </p>
        ) : (
          <p onClick={toggleForm} style={{ cursor: "pointer", marginTop: "10px" }}>
            Doesn't have an account? <span>Sign up</span>
          </p>
        )}
      </form>
    </div>
  );
}

export default LoginPage;