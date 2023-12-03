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
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)"
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    justifyContent: "center",
    alignItems: "center"
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 15px",
    margin: "5px 0",
    border: "1px solid #ddd",
    borderRadius: "4px",
    boxSizing: "border-box"
  };

  const buttonStyle = {
    backgroundColor: "#FF385C",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
    textTransform: "uppercase"
  };

  const errorStyle = {
    color: "red",
    fontSize: "0.9em"
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);

        }
      });
  };

  return (
    <div id="login-modal" style={modalStyle}>
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
        {errors && <p style={errorStyle}>{errors.message}</p>}
        <button
          style={buttonStyle}
          type="submit"
          disabled={credential.length < 4 || password.length < 6}
        >
          Log In
        </button>
      </form>
      <button
        style={buttonStyle}
        onClick={((e) => dispatch(sessionActions.login({
          credential: 'Oblivion',
          password: 'mrsquishy'
        })
        ).then(closeModal))}
      >
        Demo User Login
      </button>
    </div>
  );
}

export default LoginFormModal;
// useEffect(() => {
//   const errors = {};
//   if (credential.length < 4)
//     errors.credential = "The provided credentials were invalid";
//   if (password.length < 6)
//     errors.password = "The provided credentials were invalid";
//   setErrors(errors);
// }, [credential, password]);

// // setModalContent(null);
// useEffect(() => {
//   setCredential("");
//   setPassword("");
//   setErrors({});
// }, []);
