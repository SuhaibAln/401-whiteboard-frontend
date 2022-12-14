import axios from "axios";
import base64 from "base-64";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function Signin() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    const encoded = base64.encode(`${user.username}:${user.password}`);
    await axios
      .post(
        `https://backend-suhaib.herokuapp.com/post/`,
        {},
        {
          headers: {
            Authorization: `Basic ${encoded}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("token", true);
          localStorage.setItem("username", user.username);
          window.location.href = "/post";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Form
        onSubmit={handleSubmit}
        className="d-flex flex-column gap-3 p-3 border-0 rounded-3"
        style={{ width: "50%" }}
      >
        <h1 className="text-center">Sign In</h1>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            className="border-0 rounded-5"
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            className="border-0 rounded-5"
          />
        </Form.Group>
        <Button
          type="submit"
          className="btn btn-primary border-0 rounded-5 bg-white text-dark mt-3"
        >
          Sign In
        </Button>
        <div className="signup">
          <span>Don't have an account </span>
          <a href="/signup" className="text-decoration-none">
            Sign Up
          </a>
        </div>
      </Form>
    </div>
  );
}