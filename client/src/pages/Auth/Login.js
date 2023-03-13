//mport React from 'react';
import React, { useState } from "react";
import Layout from "./../../components/layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//import toast from "react-hot-toast";
import {toast} from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(name,email,password,address,phone);
       // toast.success("Login success");
        try {
          const res = await axios.post('/api/v1/auth/login', {
            email,
            password,
           }
           );
         if (res && res.data.success) {
           toast.success(res.data && res.data.message);
           navigate("/"); 
           toast.success("Login success");
         } else {
           toast.error(res.data.message);
         }
        } catch (error) {
         console.log(error);
         toast.error("Something went wrong");
        }
      };

  return (
    <div>
        <Layout title="Login -Donation application ">
      <div className="form-container" >
        <form onSubmit={handleSubmit}>
          <h4 className="title">LOGIN FORM</h4>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email "
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            LOGIN
          </button>
        </form>
      </div>
    </Layout>
    </div>
  )
}

export default Login;
