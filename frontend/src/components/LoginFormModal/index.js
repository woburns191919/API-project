// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
// import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const modalStyle = {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    justifyContent: "center",
    alignItems: "center",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 15px",
    margin: "5px 0",
    border: "1px solid #ddd",
    borderRadius: "4px",
    boxSizing: "border-box",
  };

  const buttonStyle = {
    backgroundColor: "#FF385C",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
    textTransform: "uppercase",
    width: "auto"
  };

  const demoStyle = {
    color: "white",
    backgroundColor: "none",
    border: "none",
    width:"auto"
  };

  const errorStyle = {
    color: "red",
    fontSize: "0.9em",
    cursor: "pointer",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        if (res.status >= 400 && res.status < 600) {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          } else {
            setErrors({ message: "An error occurred. Please try again." });
          }
        }
      });
  };

  return (
    <div id="login-modal" style={modalStyle}>
      {Object.values(errors).map((error, idx) => (
        <div key={idx} style={errorStyle}>
          {error}
        </div>
      ))}
      <h1>Log In</h1>
      <form onSubmit={handleSubmit} style={formStyle}>
        <label>
          <input
            style={inputStyle}
            placeholder="Username or Email"
            type="text"
            minLength="4"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            style={inputStyle}
            placeholder="Password"
            type="password"
            minLength="6"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button
          style={buttonStyle}
          type="submit"
          disabled={credential.length < 4 || password.length < 6}
        >
          Log In
        </button>
      </form>
      <button
        style={demoStyle}
        onClick={(e) =>
          dispatch(
            sessionActions.login({
              credential: "Oblivion",
              password: "mrsquishy",
            })
          ).then(closeModal)
        }
      >
        Demo User
      </button>
    </div>
  );
}

export default LoginFormModal;
