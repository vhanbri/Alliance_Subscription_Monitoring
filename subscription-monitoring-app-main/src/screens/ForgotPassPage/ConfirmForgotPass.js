import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserService from "../../services/UserService";
import { toast } from "react-toastify";

const ConfirmForgotPass = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await UserService.resetPassword({
        password: newPassword,
        confirmPassword: confirmNewPassword,
        email: state.email,
        token: state.verificationCode,
      });

      navigate("/login", { replace: true });
    } catch (err) {
      console.log("ConfirmForgotPass > handleSubmit > ", err);
      if (err.response.data.errors) {
        Object.values(err.response.data.errors).forEach((e) => {
          e.forEach((message) => {
            toast.error(message);
          })
          
        });
      } else {
        toast.error("Something went wrong. Try again.");
      }
    }
  };

  return (
    <div className="bg-gradient-dark ">
      <div className="container">
        {/* <!-- Outer Row --> */}
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-12 col-md-9 ">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                {/* <!-- Nested Row within Card Body --> */}
                <div className="row">
                  <div className="col-lg-6 d-none d-lg-block bg-forgot-image"></div>
                  <div className="col-lg-6">
                    <div className="p-5">
                      <img
                        alt="logo"
                        src={process.env.PUBLIC_URL + "/images/logo.png"}
                        className="pb-5"
                      />
                      <div className="">
                        <h1 className="h4 text-gray-900 mb-4">
                          Create New Password
                        </h1>
                        <p class="mb-4">
                          You’re verified! Now all you have to do is provide and
                          confirm a new password for the account attached to the
                          email you verified.
                        </p>
                      </div>
                      <form className="user" onSubmit={handleSubmit}>
                        <div className="form-group">
                          <input
                            type="password"
                            className="form-control form-control-user"
                            id="password"
                            aria-describedby="emailHelp"
                            placeholder="Enter New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                          />
                        </div>
                        <div className="form-group pb-4">
                          <input
                            type="password"
                            className="form-control form-control-user"
                            id="exampleInputPassword"
                            placeholder="Confirm New Password"
                            value={confirmNewPassword}
                            onChange={(e) =>
                              setConfirmNewPassword(e.target.value)
                            }
                          />
                        </div>

                        <button
                          className="btn btn-primary btn-user btn-block"
                          type="submit"
                        >
                          Confirm Reset
                        </button>

                        <div className="pb-5 pt-3">
                          <a
                            href="/"
                            className="btn btn-secondary btn-user btn-block text-gray-600"
                          >
                            Back to login
                          </a>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmForgotPass;
