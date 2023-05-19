import React, { useState } from "react";
import Layout from "./../../components/layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams } from "react-router-dom";

const RoleForm = () => {
  const params = useParams();
  const [role, setRole] = useState("");

  //update role function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/user/update-role/${params.id}`,
        {
          role,
        }
      );
      if (data.success) {
        toast.success("Role updated successfully");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Dashboard - Update Role">
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-9">
            <div className="m-1 w-75"></div>
            <div className="mb-3">
              <div className="col-md-4 mb-4" key={params.id}>
                <select
                  className="role p-1 m-1 mt-3"
                  value={role}
                  onChange={(event) => setRole(event.target.value)}
                  required
                >
                  <option value="">Select a new role</option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="donationReceiver">Donation Receiver</option>
                </select>

                <button className="btn btn-primary" onClick={handleUpdate}>
                  Update Role
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    </Layout>
  );
};

export default RoleForm;
