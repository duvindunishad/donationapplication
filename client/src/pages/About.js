import React from "react";
import Layout from "../components/layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const About = () => {
  return (
    <Layout title={"About"}>
      <div className="row p-2 m-3 ">
        <div className="col-md-6 ">
          <img
            src="/images/contactus.jpg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">About</h1>
          <p className="justify">
            The objective of this project is to design a Web-based charity and
            donation system and the project is focused on helping people who get
            a low income. Here can donate extra dry food and medicines, and the
            people who want to donate can use this website to distribute the
            extra materials they have to the people who find it challenging to
            find and buy food and medicines. People with very low daily wages
            will have some difficulty in getting these essential goods these
            days. In this situation why can’t help these poor people, when
            researching, could find some people who like to donate. and some
            people have extra food and medicines for their houses and offices.
            They can donate these goods without wasting through this site. Due
            to the registration through the domain of village officer, this
            website this rural low-income person can get assistance without any
            difficulty. People who do not have technical facilities can get
            these items from their region's regional secretariat offices or
            village officer’s offices by registering on the website and getting
            the items.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
