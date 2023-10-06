import React, { useContext, useRef } from "react";
import { useHistory, Link } from "react-router-dom";
import LoginContext from "../Context/LoginContext";
import classes from "./SignIn.module.css";
import Form from "../Layout/UI/Form";

const SignIn = () => {
  const emailRef = useRef("");
  const pswdRef = useRef("");
  const isAdminRef = useRef(false); // Initialize as non-admin by default

  const history = useHistory("");
  const loginCtx = useContext(LoginContext);

  const signInSubmitHandler = async (event) => {
    event.preventDefault();

    const emailValue = emailRef.current.value;
    const pswdValue = pswdRef.current.value;
    const isAdmin = isAdminRef.current.checked; // Get the value of the isAdmin checkbox

    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCSdkrWiOXFOVt4RJAPYlcoLBNb3Nv58sw",
      {
        method: "POST",
        body: JSON.stringify({
          email: emailValue,
          password: pswdValue,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (response.ok) {
      console.log(data.email);

      emailRef.current.value = "";
      pswdRef.current.value = "";

      loginCtx.login(data.email, data.idToken, isAdmin);

      history.replace("/Products");
    } else {
      alert(data.error.message);
    }
  };

  return (
    <Form onSubmit={signInSubmitHandler} className={classes.signIn}>
      <div>
        <h3>Sign In</h3>
      </div>
      <div>
        <input
          id="emailId"
          placeholder="Email"
          type="text"
          ref={emailRef}
        ></input>
        <input
          id="passwordId"
          placeholder="Password"
          type="password"
          ref={pswdRef}
        />
      </div>
      <div>
        <label>
          <input type="checkbox" ref={isAdminRef} />
          Sign in as Admin
        </label>
      </div>
      <button>Sign In</button>
      <p>
        Forgot password <Link to="/forgotPassword">Reset Here </Link>
      </p>
      <p>
        Don't have an account? <Link to="/signUp">Create here</Link>
      </p>
    </Form>
  );
};

export default SignIn;
