import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Div = styled.div`
  border: 3px solid #3d56b2;
  width: 40%;
  margin: 70px auto;
  height: 410px;
  font-size: 1.2rem;
`;

const Div2 = styled.div`
  text-align: center;
  height: 400px;
`;

const Heading = styled.h1`
  font-family: "Italianno", cursive;
  letter-spacing: 4px;
  font-weight: bolder;
  font-size: 2.8rem;
  text-align: center;
  color: white;
  background-color: #3d56b2;
  padding: 3px 0px;
  margin-bottom: 30px;
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
  font-size: 1.1rem;
`;

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // save the token and then redirect
      localStorage.setItem("token", json.authToken);
      props.showAlert("LoggedIn successfully!", "success");
      history.push("/");
    } else {
      props.showAlert("Invalid Credentials", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <Div>
        <Heading>NoteMe</Heading>

        <form onSubmit={handleSubmit}>
          <Div2>
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              className="form-control input-field"
              aria-describedby="emailHelp"
              onChange={onChange}
            />

            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control input-field"
              name="password"
              id="password"
              value={credentials.password}
              onChange={onChange}
            />

            <Button type="submit">Submit</Button>
            <P>
              Don't have account? <Link to="/signup">sign up</Link>
            </P>
          </Div2>
        </form>
      </Div>
    </>
  );
};

export default Login;
