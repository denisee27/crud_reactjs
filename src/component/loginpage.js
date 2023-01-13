import {
  Button,
  Row,
  Col,
  Card,
  Form,
  InputGroup,
  Image,
} from "react-bootstrap";
import React, { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    email: "",
    password: "",
  });
  console.log(state);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const submit = (e) => {
    e.preventDefault();
    console.log(state);
    axios
      .post("https://pos.karyaoptima.com/api/auth/login", state)
      .then(function (response) {
        if (response.data.status === 200) {
          navigate("/home");
          localStorage.setItem(
            "token",
            JSON.stringify(response.data.result.access_token)
          );
        }
      })
      .catch(function (error) {
        // handle error
        swal.fire({
          icon: "error",
          title: "Login Gagal!",
          text: "Pastikan email dan password anda sudah benar!",
        });
      });
  };
  return (
    <>
      <Card
        className="m-5 container mx-auto shadow p-5 mb-5 bg-white rounded"
        style={{ height: "fit-content", width: "fit-content" }}
      >
        <div
          className="col-12 text-center"
          style={{
            height: "50vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h1>SIGN IN REACT API</h1>
          <br />
          <form>
            <input
              className="rounded"
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
            />
            <br />
            <br />
            <input
              // className="rounded"
              className="rounded"
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
            <br />
            <br />
            <button
              className="btn btn-primary rounded-pill col-12"
              type="submit"
              onClick={submit}
            >
              SIGN IN
            </button>
          </form>

          <br />
        </div>
      </Card>
    </>
  );
};
export default Login;
