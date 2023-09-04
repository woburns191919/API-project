// frontend/src/components/LoginFormModal/index.js
import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  // const [modalContent, setModalContent] = useState(null);

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
    <div className="modal">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <input
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
            placeholder="Password"
            type="password"
            minLength="6"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors && <p>{errors.message}</p>}
        <button
          type="submit"
          disabled={credential.length < 4 || password.length < 6}
        >
          Log In
        </button>
      </form>
      <button
      onClick={((e) => dispatch(sessionActions.login({
        credential: 'Oblivion',
        password: 'mrsquishy'

      })
      ).then(closeModal)
      )}
      >
        demo user login
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
