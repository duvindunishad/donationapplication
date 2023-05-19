import React, { useState, useEffect } from "react";
import Layout from "./../../components/layout/Layout";
import AdminMenu from "./../../components/layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { message, Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [Role, setRole] = useState([]);
  const [id, setId] = useState("");

  //get all role
  const getAllrole = async () => {
    try {
      const { data } = await axios.get("/api/v1/role/get-role");
      if (data?.success) {
        setRole(data?.role);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting role");
    }
  };

  useEffect(() => {
    getAllrole();
  }, []);

  //create product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("role", Role);
      const { data } = axios.put(`/api/v1/user/update-role/${id}`, productData);
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Role Updated Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-9">
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select a role"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setRole(value);
                }}
                value={Role}
              >
                {Role?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="mb-3">
              <button className="btn btn-primary" onClick={handleUpdate}>
                UPDATE PRODUCT
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
