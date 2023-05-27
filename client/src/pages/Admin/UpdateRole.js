import React, { useState, useEffect } from "react";
import Layout from "./../../components/layout/Layout";
import AdminMenu from "./../../components/layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { message, Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "antd";

const { Option } = Select;

// const UpdateRole = () => {
//   const navigate = useNavigate();
//   const params = useParams();
//   const [Role, setRole] = useState([]);
//   const [id, setId] = useState("");

//   //get all role
//   const getAllrole = async () => {
//     try {
//       const { data } = await axios.get("/api/v1/role/get-role");
//       if (data?.success) {
//         setRole(data?.role);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Something went wrong in getting role");
//     }
//   };

//   useEffect(() => {
//     getAllrole();
//   }, []);

//   //create product function
//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       const usersData = new FormData();
//       usersData.append("role", Role);
//       const { data } = axios.put(`/api/v1/user/update-role/${id}`, usersData);
//       if (data?.success) {
//         toast.error(data?.message);
//       } else {
//         toast.success("Role Updated Successfully");
//         navigate("/dashboard/admin/users");
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("something went wrong");
//     }
//   };
//   return (
//     <Layout title={"Dashboard "}>
//       <div className="container-fluid m-3 p-3">
//         <div className="row">
//           <div className="col-md-9">
//             <div className="m-1 w-75">
//               <Select
//                 bordered={false}
//                 placeholder="Select a role"
//                 size="large"
//                 showSearch
//                 className="form-select mb-3"
//                 onChange={(value) => {
//                   setRole(value);
//                 }}
//                 value={Role}
//               >
//                 {Role?.map((c) => (
//                   <Option key={c._id} value={c._id}>
//                     {c.name}
//                   </Option>
//                 ))}
//               </Select>
//             </div>
//             <div className="mb-3">
//               <button className="btn btn-primary" onClick={handleUpdate}>
//                 UPDATE ROLE
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// const UpdateRole = () => {
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [users, setUsers] = useState([]);
//   const [id, setId] = useState(null);
//   const [newRole, setNewRole] = useState("");

//   useEffect(() => {
//     // Fetch the list of users from the server
//     const getAllUsers = async () => {
//       try {
//         const { data } = await axios.get(`/api/v1/user/all-users`);
//         setUsers(data.users);
//         message.success("successfully get all users");
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     getAllUsers();
//   }, []);

//   const handleUpdate = async () => {
//     try {
//       const response = await axios.put(`/api/v1/user/update-role`, {
//         role: newRole,
//       });

//       if (response.data.success) {
//         message.success(`User role updated to ${newRole}`);
//         setNewRole("");
//         setSelectedUser(null);
//         //setId(null);
//       } else {
//         message.error(response.data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       message.error("Failed to update user role");
//     }
//   };

//   return (
//     <div>
//       <h1>Update User Role</h1>
//       <Select
//         value={selectedUser}
//         onChange={setSelectedUser}
//         placeholder="Select a user"
//         style={{ width: 200, marginBottom: 16 }}
//       >
//         {users.map((user) => (
//           <Option key={user.id} value={user.id}>
//             {user.name}
//           </Option>
//         ))}
//       </Select>

//       <Select
//         value={newRole}
//         onChange={setNewRole}
//         placeholder="Select a new role"
//         style={{ width: 200, marginBottom: 16 }}
//       >
//         <Option value="users">Users</Option>
//         <Option value="admin">Admin</Option>
//         <Option value="donationReceiver">Donation Receiver</Option>
//       </Select>

//       <Button
//         type="primary"
//         onClick={handleUpdate}
//         //disabled={!id || !newRole}
//       >
//         Update Role
//       </Button>
//     </div>
//   );
// };

const UpdateRole = () => {
  const [users, setUsers] = useState([]);
  const [newRole, setNewRole] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    // Fetch the list of users from the server
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/v1/user");
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const handleUpdate = async (userId) => {
    try {
      const { data } = await axios.put(`/api/v1/auth/update-role/${userId}`, {
        role: newRole,
      });

      if (data.success) {
        message.success(`User roles updated to ${newRole}`);
        setNewRole("");
      } else {
        message.error(data.message);
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to update user roles");
    }
  };

  return (
    <div>
      <h6>Update User Roles</h6>

      <Select
        value={newRole}
        onChange={setNewRole}
        placeholder="Select a new role"
        style={{ width: 200, marginBottom: 16 }}
      >
        <Option value="users">Users</Option>
        <Option value="admin">Admin</Option>
        <Option value="donationReceiver">Donation Receiver</Option>
      </Select>

      <Button type="primary" onClick={handleUpdate} disabled={!newRole}>
        Update Roles
      </Button>
    </div>
  );
};

export default UpdateRole;
