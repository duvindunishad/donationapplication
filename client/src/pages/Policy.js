import React from "react";
import Layout from "../components/layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="row row p-2 m-3  ">
        <div className="col-md-6 ">
          <img
            src="/images/contactus.jpg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">Privacy Policy</h1>
          <p className="justify">
            Our web-based charity and donation application is committed to
            protecting the privacy of our users. This privacy policy explains
            how we collect, use, and share personal information and how we
            protect it. By using our platform, you agree to this policy.
          </p>
          <p>
            <b>Collection of personal data : </b>
          </p>
          <p className="justify">
            We collect personal data such as name, email address, postal
            address, and telephone number when you register as a user and when
            you make a donation. We may also collect additional information such
            as demographics, preferences, and interests to improve our services
            and user experience.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
