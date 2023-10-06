import { useRef,useState } from "react";
import Form from "../Layout/UI/Form";
import { Link } from "react-router-dom";


const ForgotPassword = () => {
    const forgotEmailRef = useRef("");
    const [successMessage, setSuccessMessage] = useState("");
    const forgotSubmitHandler = async (event) => {
      event.preventDefault();
      const forgotEmailValue = forgotEmailRef.current.value;
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCSdkrWiOXFOVt4RJAPYlcoLBNb3Nv58sw",
        {
          method: "POST",
          body: JSON.stringify({
            email: forgotEmailValue,
            requestType: "PASSWORD_RESET",
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log(data.email);
        setSuccessMessage("Sent verify mail to your account...");
      } else {
        setSuccessMessage(data.error.message);
      }
    };
  return (
      <Form onSubmit={forgotSubmitHandler}>
        <label>Enter registered email</label>
        <input
          id="forgotEmailId"
          type="text"
          placeholder="Email"
          ref={forgotEmailRef}
        ></input>
        <button>Send Link</button>
      {!!successMessage && <h4>{successMessage}</h4>}
      <p>Login <Link to="/signIn">Here</Link></p>
      </Form>
  );
};

export default ForgotPassword;