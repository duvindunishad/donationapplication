import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select, Table, message } from "antd";
const { Option } = Select;

const AllUsers = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "delivered",
    "cancel",
  ]);
  const [changeStatus, setCHangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(`/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  const handleRoleUpdate = async (userId, value) => {
    try {
      const { data } = await axios.put(`/api/v1/auth/update-role/${userId}`, {
        role: value,
      });
      message.success("Role updated successfully");
      getOrders();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update role");
    }
  };

  return (
    <Layout title={"All Orders Data"}>
      <div className="container-fluid m-3 p-3 ">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
            {orders?.map((o, i) => {
              return (
                <div className="container" key={o._id}>
                  <div className="border shadow">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">User</th>
                          <th scope="col"> Address</th>
                          <th scope="col">User Role</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{i + 1}</td>

                          <td>{o?.buyer?.name}</td>

                          <td>{o?.buyer?._id.address}</td>
                          <td>
                            <Select
                              bordered={false}
                              onChange={(value) =>
                                handleRoleUpdate(o?.buyer?._id, value)
                              }
                              defaultValue={o?.buyer?.role}
                            >
                              <Option value="admin">Admin</Option>
                              <Option value="donationreciver">
                                Donation Receiver
                              </Option>
                              <Option value="users">User</Option>
                            </Select>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AllUsers;
