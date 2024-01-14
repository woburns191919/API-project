import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
// import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors({});

    if (password !== confirmPassword) {
      setErrors({ confirmPassword: "Confirm Password must match Password" });
      return;
    }

    dispatch(
      sessionActions.signup({
        email,
        username,
        firstName,
        lastName,
        password,
      })
    )
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

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom:"10px",


  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
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
    marginTop: "10px",
    width: "auto"

  };

  const errorMessageStyle = {
    color: "red",
    fontSize: "0.8em",
    alignSelf: "flex-start",
  };

  const headingStyle = {
    color: "#484848",
    textAlign: "center",
    marginBottom: "20px",
    paddingTop:"10px"
  };

  return (
    <>
      <h3 style={headingStyle}>Sign Up</h3>
      <form onSubmit={handleSubmit} style={formStyle}>
        <label>
          <input
            style={inputStyle}
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && <p style={errorMessageStyle}>{errors.email}</p>}
        </label>

        <label>
          <input
            style={inputStyle}
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          {errors.username && (
            <p style={errorMessageStyle}>{errors.username}</p>
          )}
        </label>

        <label>
          <input
            style={inputStyle}
            placeholder="First Name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          {errors.firstName && (
            <p style={errorMessageStyle}>{errors.firstName}</p>
          )}
        </label>

        <label>
          <input
            style={inputStyle}
            placeholder="Last Name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          {errors.lastName && (
            <p style={errorMessageStyle}>{errors.lastName}</p>
          )}
        </label>

        <label>
          <input
            style={inputStyle}
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && (
            <p style={errorMessageStyle}>{errors.password}</p>
          )}
        </label>

        <label>
          <input
            style={inputStyle}
            placeholder="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {Object.keys(errors).map((key, idx) => (
          <div key={idx} className="error-message">
            {errors[key]}
          </div>
        ))}
        <button style={buttonStyle} type="submit">
          Sign Up
        </button>
      </form>
    </>
  );
}

export default SignupFormModal;
