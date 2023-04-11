import React from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";

const Orders = () => {
  // // import necessary modules
  // const mongoose = require("mongoose");

  // // define order schema
  // const orderSchema = new mongoose.Schema({
  //   items: [
  //     {
  //       name: String,
  //       price: Number,
  //     },
  //   ],
  //   total: Number,
  // });

  // // define order model
  // const Order = mongoose.model("Order", orderSchema);

  // module.exports = Order;

  return (
    <Layout title={"Your Orders"}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1>orders</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
