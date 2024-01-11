import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UseFormInp from "./use form input";
import "./signup.css";
import Navbars from "../../components/Navbar";

function Signup() {
  const [employeeId, employeeIdAttr, resetEmployeeId] = UseFormInp("");
  const [name, nameAttr, resetName] = UseFormInp("");
  const [email, emailAttr, resetEmail] = UseFormInp("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [showpass, setShowpass] = useState(false);
  const [contact, setContact] = useState("");

  const navigate = useNavigate();
  const [count, setCount] = useState(5);
  const [mailIdWithus, setMailIdWithus] = useState(false);

  const timer = () => {
    setCount((prev) => prev - 1);
  };

  const submitData = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) setPasswordMismatch(true);
    else {
      const response = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          employeeId: employeeId,
          name: name,
          email: email,
          password: password,
          confirmpassword: confirmPassword,
          contact: contact,
        }),
      });
      const json = await response.json();
      console.log(json);

      if (json.status === "success") {
        alert("Registered Successfully");
        navigate("/login");
      } else {
        console.log("email already exists");
        setMailIdWithus(true);
      }
    }
  };

  const resetData = () => {
    resetEmployeeId();
    resetName();
    resetEmail();
    setPassword("");
    setConfirmPassword("");
    setContact("");
  };

  return (
    <>
      <Navbars />
      <div className="signUpMainContainer">
        <div className="signUpFormContainer">
          {mailIdWithus ? (
            // Existing user handling
            <>
              {/* Display message and redirect countdown */}
            </>
          ) : (
            // Signup form
            <>
              <Form onSubmit={submitData}>
                <div className="centerContents">
                  <Form.Label style={{ fontSize: 20, fontWeight: 700 }}>
                    SIGN UP
                  </Form.Label>
                </div>
                <Form.Group controlId="formEmployeeId" className="mb-2">
                  <Form.Label>Employee ID</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Employee ID"
                    value={employeeId}
                    {...employeeIdAttr}
                  />
                </Form.Group>
                <Form.Group controlId="formName" className="mb-2">
                  <Form.Label>Employee Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    value={name}
                    {...nameAttr}
                  />
                </Form.Group>
                <Form.Group controlId="formEmail" className="mb-2">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    value={email}
                    {...emailAttr}
                  />
                </Form.Group>
                <Form.Group controlId="formPassword" className="mb-2">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type={showpass ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setPasswordMismatch(false);
                    }}
                  />
                </Form.Group>
                <Form.Group controlId="formConfirmPassword" className="mb-2">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type={showpass ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setPasswordMismatch(false);
                    }}
                  />
                  {passwordMismatch && (
                    <Form.Text className="signupFormWrongPassword">
                      Passwords do not match
                    </Form.Text>
                  )}
                </Form.Group>
                <Form.Group controlId="formMobileNumber" className="mb-2">
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Mobile Number"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox" className="mb-3">
                <Form.Check
                    // style={removeMargin}
                    type="checkbox"
                    label="Show password"
                    onClick={(e) => {
                      setShowpass(!showpass);
                    }}
                  />
                </Form.Group>
                <div className="signupFormButtonContainer mb-3">
                  <Button
                    className="signupFormButton"
                    variant="outline-primary"
                    type="submit"
                  >
                    SIGNUP
                  </Button>
                  <Button
                    className="signupFormButton"
                    variant="outline-danger"
                    type="reset"
                    onClick={resetData}
                  >
                    RESET
                  </Button>
                </div>
              </Form>
              <hr />
              <div className="d-grid gap-2">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate("/login")}
                >
                  Already have an account
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Signup;

