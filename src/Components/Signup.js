import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const Div = styled.div`
  border: 3px solid #3d56b2;
  width: 42%;
  margin: 15px auto;
  height: 580px;
  font-size: 1.2rem;
`;

const Div2 = styled.div`
  text-align: center;
  height: 400px;
`;

const Heading = styled.h1`
  /* font-family: "Italianno", cursive; */
  letter-spacing: 4px;
  font-weight: bolder;
  font-size: 2rem;
  text-align: center;
  color: white;
  background-color: #3d56b2;
  padding: 10px 0px;
  margin-bottom: 20px;
  /* border-left: 5px solid #f0a500; */
`;

const Button = styled.button`
  background-color: #3d56b2;
  color: white;
  border-radius: 5px;
  padding: 5px 10px;
  width: 90%;
  border: none;
  &:hover {
    background-color: #14279b;
  }
  margin-bottom: 23px;
`;

const P = styled.p`
  font-size: 1rem;
`;

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  let history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // save the token and then redirect
      localStorage.setItem("token", json.authToken);
      props.showAlert("Account created successfully!", "success");
      history.push("/");
    } else {
      props.showAlert("Invalid Details", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  console.log(credentials);
  return (
    <Div>
      <Heading>Sign Up</Heading>
      <form onSubmit={handleSubmit}>
        <Div2>
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control input-field"
            id="name"
            name="name"
            aria-describedby="emailHelp"
            onChange={onChange}
          />

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              name="email"
              className="form-control input-field"
              id="email"
              aria-describedby="emailHelp"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="form-control input-field"
              id="password"
              onChange={onChange}
              minLength={8}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              name="cpassword"
              className="form-control input-field"
              onChange={onChange}
              id="cpassword"
              minLength={8}
              required
            />
          </div>

          <Button type="submit">Submit</Button>
          <P>Note: Create your account to keep your notes private.</P>
        </Div2>
      </form>
    </Div>
  );
};

export default Signup;
