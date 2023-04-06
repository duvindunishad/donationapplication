import React from "react";
import Layout from "../components/layout/Layout";
import { useSave } from "../context/save";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";

const SavePage = () => {
  const [auth, setAuth] = useAuth();
  const [save, setSave] = useSave();
  //   const [clientToken, setClientToken] = useState("");
  //   const [instance, setInstance] = useState("");
  //   const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //delete item
  const removeSaveItem = (pid) => {
    try {
      let mySave = [...save];
      let index = mySave.findIndex((item) => item._id === pid);
      mySave.splice(index, 1);
      setSave(mySave);
      localStorage.setItem("Save", JSON.stringify(mySave));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {!auth?.user
                ? "Hello Guest"
                : `Hello  ${auth?.token && auth?.user?.name}`}
              <h4 className="text-center">
                {save?.length
                  ? `You Have ${save.length} items in your save ${
                      auth?.token
                        ? ""
                        : "please login to checkout & request the donation !"
                    }`
                  : " Your save Is Empty"}
              </h4>
            </h1>
          </div>
        </div>
        <div className="container ">
          <div className="row ">
            <div className="col-md-7  p-0 m-0">
              {save?.map((p) => (
                <div className="row card flex-row" key={p._id}>
                  <div className="col-md-4">
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                      width="100%"
                      height={"130px"}
                    />
                  </div>
                  <div className="col-md-4">
                    <p>{p.name}</p>
                    <p>{p.description.substring(0, 30)}</p>
                    <p>ExpireDate : {p.expireDate}</p>
                  </div>
                  <div className="col-md-4 save-remove-btn">
                    <button
                      className="btn btn-danger"
                      onClick={() => removeSaveItem(p._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-5 save-summary ">
              <h2>save Summary</h2>
              <p>Requested products</p>
              <hr />

              {auth?.user?.address ? (
                <>
                  <div className="mb-3">
                    <h4>Current Address</h4>
                    <h5>{auth?.user?.address}</h5>
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  </div>
                </>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() =>
                        navigate("/login", {
                          state: "/save",
                        })
                      }
                    >
                      Please Login to checkout
                    </button>
                  )}
                </div>
              )}
              {/* <div className="mt-2">
                {!clientToken || !auth?.token || !save?.length ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />

                    <button
                      className="btn btn-primary"
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth?.user?.address}
                    >
                      {loading ? "Processing ...." : "Make Payment"}
                    </button>
                  </>
                )}
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SavePage;
