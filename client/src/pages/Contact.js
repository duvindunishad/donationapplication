import React, { useRef, useState } from "react";
import Layout from "./../components/layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
import emailjs from "@emailjs/browser";
// import { Result } from "antd";

const Result = () => {
  return (
    <b>
      {" "}
      <p style={{ color: "#50C878" }}>
        Your message has been sent successfully. we will contact you soon.
      </p>
    </b>
  );
};

const Contact = () => {
  const [result, showResult] = useState(false);
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_cz5wdwf",
        "template_6t7zins",
        form.current,
        "6QA0PNwn-0mh8JBFh"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
    showResult(true);
  };

  return (
    <Layout title={"Contact us"}>
      <div className="row p-2 m-3 ">
        <div className="col-md-6 ">
          <img
            src="/images/contactus.jpg"
            alt="contactus"
            style={{ width: "100%" }}
          />
          <p className="mt-3">
            <BiMailSend /> : www.donation.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 011-1252434
          </p>
          <p className="justify">
            We are available to assist you Monday through Friday from 9:00 AM to
            5:00 PM. Thank you for using our platform to support charitable
            causes. We appreciate your feedback and will respond to your
            inquiries as soon as possible.{" "}
          </p>
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="justify">
            If you have any questions or concerns about our platform, please get
            in touch with us using the information below:
          </p>

          <form ref={form} onSubmit={sendEmail}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                required
              />
            </div>

            <div className="form-group mt-2">
              <label htmlFor="subject">Phone number</label>
              <input
                type="number"
                className="form-control"
                id="phone"
                name="phone"
                required
              />
            </div>
            <div className="form-group mt-2">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                required
              />
            </div>
            <div className="form-group mt-2">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                className="form-control"
                id="subject"
                name="subject"
                required
              />
            </div>
            <div className="form-group mt-2">
              <label htmlFor="message">Message</label>
              <textarea
                className="form-control"
                id="message"
                name="message"
                rows="5"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary mt-2">
              Submit
            </button>
            <div className="row">{result ? <Result /> : null}</div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
