import React, { useState } from "react";
import Layout from "./../../components/layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//import toast from "react-hot-toast";
import { toast } from "react-toastify";

//import "../../styles/AuthStyles.css";
//import { Toast } from "react-toastify/dist/components";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const [photo, setPhoto] = useState("");

  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(name, email, password, address, phone);
    //toast.success("Register success");
    try {
      const res = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
        answer,
        photo,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
        toast.success("Register success");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  //   if (res && res.data.success) {
  //     toast.success(res.data && res.data.message);
  //     navigate("/login");
  //     toast.success("Register success");
  //   } else {
  //     toast.error(res.data.message);
  //   }
  // } catch (error) {
  //   console.log(error);
  //   toast.error("Something went wrong");
  // }
  // };

  return (
    <Layout title="Register -Donation application ">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h4 className="title">REGISTER FORM</h4>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Name"
              required
              autoFocus
            />
          </div>
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
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Phone"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Address"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="What is Your Favorite sports"
              required
            />
          </div>
          <div className="mb-3">
            {photo ? photo.name : "Upload Your Face Photo Below"}
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
              className="form-control mt-3"
              id="exampleInputEmail1"
              placeholder="Upload your face original photo"
              // onChange={imageUpload}
              // onChange={handlePhoto}
            />
          </div>
          <div className="mb-3">
            {photo && (
              <div className="text-center">
                <img
                  src={URL.createObjectURL(photo)}
                  alt="product_photo"
                  height={"200px"}
                  className="img img-responsive"
                />
              </div>
            )}
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary ">
              REGISTER
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
