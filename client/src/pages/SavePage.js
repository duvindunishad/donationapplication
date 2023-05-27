import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { useSave } from "../context/save";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import "../styles/SaveStyles.css";
import { useParams } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";

// import { request } from "express";
import { message } from "antd";
import Orders from "./user/Orders";

const SavePage = () => {
  const [auth, setAuth] = useAuth();
  const [save, setSave] = useSave();
  const [requesting, setRequesting] = useState(false);
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const createOrder = async (items) => {
    try {
      const response = await axios.post("/api/orders", { items });
      return response.data.order;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create order.");
    }
  };

  //   const requestDonation = async () => {
  //     try {
  //       setRequesting(true);
  //       // make donation request here
  //       localStorage.removeItem("Save");
  //       setSave([]);
  //       message.success("Request successful.");
  //       navigate("/dashboard/user/orders");
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setRequesting(false);
  //     }
  //   };

  const requestDonation = async () => {
    try {
      setRequesting(true);

      // make donation request here
      const items = save.map((item) => ({ id: item._id, name: item.name, address: item.address }));
      localStorage.removeItem("Save");
      setSave([]);

      message.success("Request successful.");
      navigate("/dashboard/donationReciver/orders", { state: { items } }); // pass items as a prop to the order page
    } catch (error) {
      console.log(error);
    } finally {
      setRequesting(false);
    }
  };

  //delete item
  const removeSaveItem = (pid) => {
    try {
      let mySave = [...save];
      let index = mySave.findIndex((item) => item._id === pid);
      mySave.splice(index, 1);
      setSave(mySave);
      localStorage.setItem("Save", JSON.stringify(mySave));
    } catch (error) {
      console.log(error);
    }
  };

  //get payment/ Request gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handle Requests
  const handleRequest = async () => {
    try {
      setLoading(true);
      //const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/request", {
        // nonce,
        save,
      });

      setLoading(false);
      localStorage.removeItem("save");

      setSave([]);
      navigate("/dashboard/donationReciver/orders");
      message.success("Request Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="save-page">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {!auth?.user
                ? "Hello Guest"
                : `Hello  ${auth?.token && auth?.user?.name}`}
              <p className="text-center">
                {save?.length
                  ? `You Have ${save.length} items in your save ${
                      auth?.token
                        ? ""
                        : "please login to checkout & request the donation !"
                    }`
                  : " Your save Is Empty"}
              </p>
            </h1>
          </div>
        </div>
        <div className="container">
          <div className="row ">
            <div className="col-md-7  p-1 m-0">
              {save?.map((p) => (
                <div className="row card flex-row p-2 m-1" key={p._id}>
                  <div className="col-md-4">
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                      width="100%"
                      height={"130px"}
                    />
                  </div>
                  <div className="col-md-4">
                    <p>
                      <b>Product Name : </b> {p.name}
                    </p>
                    <p>
                      <b>Description : </b> {p.description.substring(0, 30)}
                    </p>
                    <p>
                      <b>ExpireDate : </b> {p.expireDate}
                    </p>
                    {/* </div> */}
                    <div className="col-md-4 save-remove-btn">
                      <button
                        className="btn btn-danger "
                        onClick={() => removeSaveItem(p._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-5 save-summary ">
              <h2>Save Summary</h2>
              <p>Requested products</p>
              <hr />

              {auth?.user?.address ? (
                <>
                  <div className="mb-3">
                    <h4>Current Address</h4>
                    <h5>{!loading || !instance || auth?.user?.address}</h5>
                    <button
                      className="btn btn-outline-warning"
                      onClick={() =>
                        navigate("/dashboard/donationReciver/profile")
                      }
                    >
                      Update Address
                    </button>
                  </div>
                </>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() =>
                        navigate("/dashboard/donationReciver/profile")
                      }
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() =>
                        navigate("/login", {
                          state: "/save",
                        })
                      }
                    >
                      Please Login to checkout
                    </button>
                  )}
                </div>
              )}

              {/* <div className="mt-2">
                <button
                  onClick={requestDonation}
                  className="btn btn-primary"
                  disabled={!auth?.user?.address}
                >
                  Request donation
                </button>
              </div> */}
              <div className="mt-2">
                {!clientToken || !auth?.token || !save?.length ? (
                  ""
                ) : (
                  <>
                    <div
                      options={{
                        authorization: clientToken,
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />
                    {/* here i create to only enable the request button when requester is an donation requester */}
                    <button
                      className="btn btn-primary mb-3"
                      onClick={handleRequest}
                      enable={
                        loading ||
                        !instance ||
                        !auth?.user?.address ||
                        !auth?.user?.role === "donationreciver"
                      }
                      disabled={
                        auth?.user?.role === "users" ||
                        auth?.user?.role === "admin"
                      }
                    >
                      {loading ? "Processing ...." : "Make Request"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SavePage;
