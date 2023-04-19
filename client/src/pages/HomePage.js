import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import "../styles/Homepage.css";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { Button, message } from "antd";
import { Checkbox, Radio } from "antd";
import { ExpireDate } from "../components/expireDate";
import { json } from "react-router-dom";
import { useSave } from "../context/save";
import { toast } from "react-toastify";

const HomePage = () => {
  const navigate = useNavigate();
  const [save, setSave] = useSave();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //image slide show
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([
    {
      url: "/images/banner1.png",
    },
    {
      url: "/images/banner2.png",
    },
    {
      url: "/images/banner3.png",
    },
    {
      url: "/images/banner4.png",
    },
    {
      url: "/images/banner5.png",
    },
    {
      url: "/images/banner6.png",
    },
    {
      url: "/images/banner7.png",
    },
  ]);

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //get Total Count
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  // useEffect(()=>{getAllProducts()},[]);
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filtered product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  //image slide shower
  useEffect(() => {
    // Use setInterval to change the currentIndex every 3 seconds
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        return nextIndex >= images.length ? 0 : nextIndex;
      });
    }, 3000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [images.length]);

  return (
    <Layout title={"donate"}>
      <div className="slide-container mt-2">
        <div className="slide-image-container">
          <img
            src={images[currentIndex].url}
            className="slide-image"
            alt="Slide image"
            width="100%"
            height={350}
          />
          <div className="slide-caption">{images[currentIndex].caption}</div>
        </div>
        <div className="slide-dots">
          {images.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => setCurrentIndex(index)}
            ></span>
          ))}
          <div className="row mt-3">
            <div className="col-md-2">
              <h4 className="text-center">Filter by category</h4>
              <div className="d-flex flex-column">
                {categories?.map((c) => (
                  <Checkbox
                    key={c._id}
                    onChange={(e) => handleFilter(e.target.checked, c._id)}
                  >
                    {c.name}
                  </Checkbox>
                ))}
              </div>
              {/* date filter */}
              <h4 className="text-center mt-4">Filter by date</h4>
              <div className="d-flex flex-column">
                <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                  {ExpireDate?.map((p) => (
                    <div key={p._id}>
                      <Radio value={p.array}>{p.name}</Radio>
                    </div>
                  ))}
                </Radio.Group>
              </div>
              <div className="d-flex flex-column p-1 m-1">
                <button
                  className="btn btn-danger"
                  onClick={() => window.location.reload()}
                >
                  Filter Reset
                </button>
              </div>
            </div>
            <div className="col-md-9">
              {/* {JSON.stringify(radio, null, 4)} */}
              <h1 className="text-center">All products</h1>
              <div className="d-flex flex-wrap">
                {products?.map((p) => (
                  <div className="card m-3" style={{ width: "18rem" }}>
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

                      <div className="card-name-expireDate">
                        <button
                          class="btn btn-primary ms-3"
                          onClick={() => navigate(`/product/${p.slug}`)}
                        >
                          more details
                        </button>
                        <button
                          class="btn btn-secondary ms-5"
                          onClick={() => {
                            setSave([...save, p]);
                            message.success("Item saved successfully");
                          }}
                        >
                          save
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="m-2 p-3">
                {products && products.length < total && (
                  <button
                    className="btn btn-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(page + 1);
                    }}
                  >
                    Load more
                    {/* {loading ? (
                  "Loading ..."
                ) : (
                  <> Loadmore <AiOutlineReload /> </>
                )} */}
                  </button>
                )}
              </div>
              {/* here two dev tags are related to the image slider */}
            </div>
          </div>{" "}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
