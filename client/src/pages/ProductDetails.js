import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { message } from "antd";
import { useSave } from "../context/save";
import "../styles/CategoryProductStyles.css";
import { FaLine } from "react-icons/fa";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [save, setSave] = useSave();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  //initial product details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //get products
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="row container mt-4">
        <div className="col-md-1"></div>
        <div className="col-md-4">
          <img
            src={`/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height="300"
            width={"350px"}
          />
        </div>
        <div className="col-md-1"></div>
        <div className="col-md-6 product-details-info">
          <h1 className="text-center">Product Details</h1>
          <hr />
          <h6>Name : {product.name}</h6>
          <h6 className="text-align: justify">
            Description : {product.description}
          </h6>
          <h6>
            expireDate :
            {product?.expireDate?.toLocaleString("en-US", {
              style: "date",
            })}
          </h6>
          <h6>Category : {product?.category?.name}</h6>
          <button
            class="btn btn-secondary ms-1"
            onClick={() => {
              setSave([...save, product]);
              message.success("Item saved successfully");
            }}
          >
            save
          </button>
        </div>
      </div>
      <hr />
      <div className="row container similar-products">
        <h4>Similar Products ➡️</h4>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex flex-wrap ">
          {relatedProducts?.map((p) => (
            <div className="card m-5" key={p._id}>
              <img
                src={`/api/v1/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
                height="100"
                width={"150px"}
              />
              <div className="card-body">
                {/* <div className="card-name-expireDate"> */}
                <h5 className="card-title">Item Name : {p.name}</h5>
                {/* <h5 className="card-title card-expireDate">
                    {p.expireDate.toLocaleString("en-US", {
                      style: "date",
                     
                    })}
                  </h5> */}
                {/* </div> */}
                <p className="card-text text-align: justify">
                  Item Description : {p.description.substring(0, 60)}...
                </p>

                <div className="card-name-expireDate">
                  <button
                    className="btn btn-info ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                </div>

                <button
                  class="btn btn-secondary ms-1 p-1 m-2"
                  onClick={() => {
                    setSave([...save, p]);
                    message.success("Item saved successfully");
                  }}
                >
                  save
                </button>
              </div>
            </div>
            // </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
