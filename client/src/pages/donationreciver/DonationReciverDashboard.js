import React from "react";
//import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/auth";
import DonationReciverMenu from "../../components/layout/DonationReciverMenu";

const DonationReciverDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <DonationReciverMenu />
          </div>
          <div className="col-md-9 p-3 m-0">
            <div className="card w-75 p-3 m-2">
              <h3> DonationReciver Name : {auth?.user?.name}</h3>
              <h3> DonationReciver Email : {auth?.user?.email}</h3>
              <h3> DonationReciver Contact : {auth?.user?.phone}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DonationReciverDashboard;
