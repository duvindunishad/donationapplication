import React from "react";
import { NavLink } from "react-router-dom";

const DonationReciverMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <h4>DonationReciver Panel</h4>
          {/* <NavLink
            to="/dashboard/donationReciver/create-category"
            className="list-group-item list-group-item-action"
          >
            Create category
          </NavLink> */}
          {/* <NavLink
            to="/dashboard/donationReciver/create-product"
            className="list-group-item list-group-item-action"
          >
            Create Products
          </NavLink> */}

          {/* <NavLink
            to="/dashboard/donationReciver/products"
            className="list-group-item list-group-item-action"
          >
            Products
          </NavLink> */}

          <NavLink
            to="/dashboard/donationReciver/profile"
            className="list-group-item list-group-item-action"
          >
            Profile
          </NavLink>
          <NavLink
            to="/dashboard/donationReciver/orders"
            className="list-group-item list-group-item-action"
          >
            Orders
          </NavLink>

          {/* <NavLink
            to="/dashboard/donationReciver/users"
            className="list-group-item list-group-item-action"
          >
            Users
          </NavLink> */}
        </div>
      </div>
    </>
  );
};

export default DonationReciverMenu;
