//mport React from 'react';
import React, { useState } from "react";
import Layout from "./../../components/layout/Layout";
import axios from "axios";
import { useNavigate,useLocation } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
//import toast from "react-hot-toast";
import {toast} from "react-toastify";
import { useAuth } from "../../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth,setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

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
           setAuth({
            ...auth,
            user: res.data.user,
            token: res.data.token,
            //here get the user details after user login
           });
           localStorage.setItem('auth',JSON.stringify(res.data));

           navigate(location.state || "/"); 
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

         <div className="mb-3">
         <button type="button" className="btn btn-primary" onClick={()=>{navigate("/forgot-password")}}>
            Forgot Password
          </button>
         </div>

          <button type="submit" className="btn btn-primary">
            LOGIN
          </button>
        </form>
      </div>
    </Layout>
    </div>
  );
};

export default Login;
