import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/CategoryProductStyles.css";
import axios from "axios";
import { message } from "antd";
import { useSave } from "../context/save";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [save, setSave] = useSave();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);

  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container mt-3 category">
        <h4 className="text-center">Category - {category?.name}</h4>
        <h6 className="text-center">{products?.length} result found </h6>
        <div className="row">
          <div className="col-md-9 offset-1">
            <div className="d-flex flex-wrap">
              {products?.map((p) => (
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">
                      {p.description.substring(0, 30)}
                    </p>
                    <p className="card-text">ExpireDate : {p.expireDate}</p>
                    <p className="card-text">
                      <b>Available : {p.quantity}</b>{" "}
                    </p>
                    <button
                      class="btn btn-primary ms-0"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      more details
                    </button>
                    <button
                      class="btn btn-secondary ms-0 mt-1"
                      onClick={() => {
                        setSave([...save, p]);
                        message.success("Item saved successfully");
                      }}
                    >
                      save
                    </button>
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

export default CategoryProduct;
