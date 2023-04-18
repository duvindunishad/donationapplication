import React from "react";
import Layout from "./../components/layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
const Contact = () => {
  return (
    <Layout title={"Contact us"}>
      <div className="row p-2 m-3 ">
        <div className="col-md-6 ">
          <img
            src="/images/contactus.jpg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="justify">
            If you have any questions or concerns about our platform, please get
            in touch with us using the information below:
          </p>
          <p className="mt-3">
            <BiMailSend /> : www.donation.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 094-1252434
          </p>
          <p className="justify">
            We are available to assist you Monday through Friday from 9:00 AM to
            5:00 PM. Thank you for using our platform to support charitable
            causes. We appreciate your feedback and will respond to your
            inquiries as soon as possible.{" "}
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
