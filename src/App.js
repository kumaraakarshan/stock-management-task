import React, { useContext,useState } from "react";


import "./App.css";

import { Route, Redirect } from "react-router-dom";
import LoginContext from "./Components/Context/LoginContext";
import Welcome from "./Components/Pages/Welcome";
import IncompleteProfile from "./Components/Pages/IncompleteProfile";
import ForgotPassword from "./Components/Pages/ForgetPassword";
import Products from "./Components/Pages/Products";
import { ProductContextProvider } from "./Components/Context/ProductContext";

import SignUp from "./Components/Pages/SignUp";
import SignIn from "./Components/Pages/SignIn";
import Header from "./Components/Layout/Header";

function App() {
  
  const loginCtx = useContext(LoginContext);
  const isLoggedIn = loginCtx.isLoggedIn;
  const isAdmin = loginCtx.isAdmin;
  console.log(loginCtx)
  return (
    <React.Fragment>
      <Header />
      {<Route path="/" exact>
          <Redirect to="/signUp" />
        </Route>}
      <Route path="/signUp">
        <SignUp />
      </Route>
      <Route path="/signIn">
        <SignIn />

      </Route>
      <Route path="/welcome">
        <Welcome />

      </Route>
      <Route path="/incompleteProfile">
        <IncompleteProfile />


      </Route>
      <Route path="/forgotPassword">
        <ForgotPassword />
      </Route>
      
      <ProductContextProvider>
  <Route path="/Products" render={() => <Products isAdmin={isAdmin} />} />
</ProductContextProvider>

    </React.Fragment>
  );
}

export default App;
