import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import axios from "axios";
// import { message } from "antd";
import { Form, Select, Button, message } from "antd";
import { Modal } from "antd";
import RoleForm from "../../components/Form/RoleForm";
import { useParams } from "react-router-dom";

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
  const handleUpdate = async (id) => {
    // debugger;
    // e.preventDefault();
    try {
      //getId(users.data.id);
      const { data } = await axios.put(
        `/api/v1/user/update-role/${id}`,
        {
          role: newRole,
        },
        setNewRole(users.role)
      );
      if (data.success) {
        message.success(`role updated to ${newRole}`);
        setSelected(null);
        setUpdatedRole("");
        setVisible(false);
        getAllUsers();
      } else {
        message.error(data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
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
                          <Form>
                            <Form.Item
                              className="role p-1 m-1 mt-3"
                              // name="role"
                              value=""
                              rules={[
                                {
                                  required: true,
                                  message: "Please select a new role",
                                },
                              ]}
                              onChange={(value) => setRole(value)} // <- Set the newRole variable based on the selected value
                            >
                              <Select
                                placeholder="Select a new role"
                                //onChange={(value) => setNewRole(value)}
                              >
                                {/* <option value="">Select a new role</option> */}
                                <Option value="users">User</Option>
                                <Option value="admin">Admin</Option>
                                <Option value="donationReceiver">
                                  Donation Receiver
                                </Option>
                              </Select>
                            </Form.Item>

                            <Button
                              className="btn-primary text-center"
                              // onClick={handleUpdate}
                              onClick={() => {
                                handleUpdate(role);
                              }}
                            >
                              Update Role
                            </Button>
                          </Form>
                        </div>
                        {/* <div className="col-md-4 mb-4" key={users._id}>
                          <select
                            className="role p-1 m-1 mt-3"
                            value={role}
                            onChange={(event) => setRole(event.target.value)}
                            required
                          >
                            <option value="">Select a new role</option>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                            <option value="donationReceiver">
                              Donation Receiver
                            </option>
                          </select>

                          <button
                            className="btn btn-primary"
                            disabled={!role}
                            onClick={() => onFinish(users._id)}
                          >
                            Update Role
                          </button>
                        </div> */}
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
