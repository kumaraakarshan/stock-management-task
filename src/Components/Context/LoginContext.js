import React, { useState } from "react";

const LoginContext = React.createContext({
  email: null,
  idToken: null,
  isLoggedIn: false,
  isAdmin:false,
  login: () => {},
  logout: () => {},
});

export const LoginContextProvider = (props) => {
  const [email, setEmail] = useState(localStorage.getItem("emailId"));
  const [idToken, setIdToken] = useState(localStorage.getItem("idToken"));
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("emailId")
  );
  const [isAdmin, setIsAdmin] = useState(
    !!localStorage.getItem("emailId")
  );

  const loginHandler = (email, idToken, isAdmin) => {
    setEmail(email);
    setIdToken(idToken);
    setIsLoggedIn(true);
    setIsAdmin(isAdmin); // Set isAdmin based on the value passed as a parameter
  
    localStorage.setItem("EmailId", email);
    localStorage.setItem("idToken", idToken);
  };
  
  const logoutHandler = () => {
    setEmail(null);
    setIdToken(null);
    setIsLoggedIn(false);
    setIsAdmin(false);

    localStorage.removeItem("emailId");
    localStorage.removeItem("idToken");
  };
  const loginContext = {
    email: email,
    idToken: idToken,
    isAdmin:isAdmin,
    isLoggedIn: isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <LoginContext.Provider value={loginContext}>
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginContext;