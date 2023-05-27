import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import axios from "axios";
// import { message } from "antd";
import { Form, Select, Button, message } from "antd";
import { Modal } from "antd";
import RoleForm from "../../components/Form/RoleForm";
import { useParams } from "react-router-dom";
import UpdateRole from "./UpdateRole";
import AllUsers from "./AllUsers";

const { Option } = Select;

const Users = () => {
  const [users, setUsers] = useState([]);
  // const [users_id, setusers_id] = useState("");
  const [id, getId] = useState("");
  // const [role, setRole] = useState("");
  //const [newRole, setRole] = useState("");

  const [newRole, setNewRole] = useState("");

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedRole, setUpdatedRole] = useState("");

  const [role, setRole] = useState("");

  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);

  const params = useParams();

  const handleUserChange = (value) => {
    setSelectedUser(value);
  };

  //get all users
  const getAllUsers = async (req, res) => {
    try {
      const { data } = await axios.get(`/api/v1/user/all-users`);
      setUsers(data.users);
      message.success("successfully get all users");
    } catch (error) {
      message.error("error getting users");
      console.log(error);
    }
  };
  useEffect(() => {
    getAllUsers();
    //eslint-disable-next-line
  }, []);

  //delete users
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`/api/v1/user/delete-users/${id}`);
      if (data.success) {
        message.success(`User is deleted`);

        getAllUsers();
      } else {
        message.error(data.message);
      }
    } catch (error) {
      message.error("Something went wrong");
    }
  };

  //update user role
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const { data } = await axios.put(
  //       `/api/v1/user/update-role/${selected._id}`,
  //       { role: updatedRole } // send updated role in request body
  //     );
  //     if (data?.success) {
  //       message.success(`${selected.role}'s role updated to ${updatedRole}`);
  //       setSelected(null);
  //       setUpdatedRole("");
  //       setVisible(false);
  //       getAllUsers();
  //     } else {
  //       message.error(data.message);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.put(`/update-role/:${id}`, {
  //       role: newRole,
  //     });
  //     console.log(res.data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  //------------------------------------------
  // const handleRoleUpdate = async (userId, value, id) => {
  //   try {
  //     const { data } = await axios.put(`/api/v1/auth/update-role/${userId}`, {
  //       role: value,
  //     });
  //     if (data.success) {
  //       message.success("Role updated successfully");
  //       // Perform any additional actions after role update if needed
  //     } else {
  //       message.error(data.message);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     message.error("Failed to update role");
  //   }
  // };

  const handleUpdate = async (id) => {
    //debugger;
    // e.preventDefault();
    try {
      // getId(users.data.userId);
      const { data } = await axios.put(`/api/v1/user/update-role/${id}`, {
        role: newRole,
      });

      if (data.success) {
        message.success(`User roles updated to ${newRole}`);
        setNewRole("");
        getAllUsers();
      } else {
        message.error(data.message);
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to update user roles");
    }
  };
  //--------------------------------

  return (
    <Layout title={"Dashboard - Users"}>
      <div className="container-flu users_id m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">Users</h1>
            <div className="row">
              {users.map((users) => (
                <div className="col-md-4 mb-4" key={users._id}>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Name : {users.name}</h5>
                      <p className="card-text">Email : {users.email}</p>
                      <p className="card-text">Role : {users.role}</p>

                      <div className="col-md-mb-3">
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            handleDelete(users._id);
                          }}
                        >
                          Delete User
                        </button>
                        <div className="col-md-4 mb-4" key={users._id}>
                          {/* <table className="table">
                            <thead>
                              <tr>
                                <th scope="col">User</th>
                                <th scope="col"> Address</th>
                                <th scope="col">User Role</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>{users?.name}</td>
                                <td>{users?._id.address}</td>
                                <td>
                                  <Select
                                    value={newRole}
                                    onChange={setNewRole}
                                    placeholder="Select a new role"
                                    style={{ width: 200, marginBottom: 16 }}
                                  >
                                    <Option value="users">Users</Option>
                                    <Option value="admin">Admin</Option>
                                    <Option value="donationReceiver">
                                      Donation Receiver
                                    </Option>
                                  </Select>
                                </td>
                              </tr>
                            </tbody>
                          </table> */}
                          {/* <UpdateRole></UpdateRole> */}
                          {/* <AllUsers></AllUsers> */}
                        </div>

                        <div className="col-md-4 mb-4" key={users._id}>
                          <Select
                            // value={newRole}
                            onChange={setNewRole}
                            placeholder="Select a new role"
                            style={{ width: 200, marginBottom: 16 }}
                          >
                            <Option value="users">Users</Option>
                            <Option value="admin">Admin</Option>
                            <Option value="donationReceiver">
                              Donation Receiver
                            </Option>
                          </Select>
                          <br />
                          <button
                            className="btn btn-primary"
                            //disabled={!role}
                            onClick={() => handleUpdate(users._id)}
                          >
                            Update Role
                          </button>
                          {/* <button
                            className="btn btn-primary"
                            onClick={() => handleUpdate(users._id.setNewRole())}
                          >
                            Update Role
                          </button> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
