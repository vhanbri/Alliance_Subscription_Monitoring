import React from "react";
import API from "../../api/API";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../../constants";
import withAuth from "../../hocs/WithAuth";
const Register = () => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const RegisterForm = async (event) => {
    event.preventDefault();
    const formField = {
      firstName: first_name,
      lastName: last_name,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      role: ROLES.USER,
    };

    try {
      if (
        first_name === "" ||
        last_name === "" ||
        email === "" ||
        password === "" ||
        confirmPassword === ""
      ) {
        toast.error("Please fill all fields", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }
      const response = await API.post("/UserAPI/Register", formField);
      if (response.status === 200) {
        toast.success("Registration successful", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate("/");
      }
    } catch (error) {
      console.log("RegisterForm > Error: ", error);

      if (error.response && error.response.data && error.response.data.errors) {
        const errorMessage = Object.values(error.response.data.errors).join(
          "\n"
        );
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (
        error.response &&
        error.response.data.ModelStateErrors.Errors.length !== 0
      ) {
        error.response.data.ModelStateErrors.Errors.forEach((e) => {
          toast.error(e.ErrorMessage, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
      } else {
        toast.error(error.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  const checkPassword = (e) => {
    const confPass = e.target.value;
    setConfirmPassword(confPass);
    if (password !== confPass) {
      setError("Passwords do not match");
    } else {
      setError(" ");
    }
  };
  return (
    <div className="bg-gradient-dark ">
      <div className="container ">
        {/* <!-- Outer Row --> */}
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-12 col-md-9 ">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                {/* <!-- Nested Row within Card Body --> */}
                <div className="row">
                  <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                  <div className="col-lg-6">
                    <div className="p-5">
                      <img
                        alt="logo"
                        src={process.env.PUBLIC_URL + "/images/logo.png"}
                        className="pb-5"
                      />
                      <div className="">
                        <h1 className="h4 text-gray-900 mb-5">
                          Create an account
                        </h1>
                      </div>
                      <form className="user">
                        <div class="form-group row">
                          <div class="col-sm-6 mb-3 mb-sm-0">
                            <input
                              type="text"
                              class="form-control form-control-user"
                              // id="exampleFirstName"
                              placeholder="Enter first name"
                              name="firstName"
                              value={first_name}
                              onChange={(e) => setFirstName(e.target.value)}
                            />
                          </div>
                          <div class="col-sm-6">
                            <input
                              type="text"
                              class="form-control form-control-user"
                              //  id="exampleLastName"
                              placeholder="Enter last name"
                              name="lastName"
                              value={last_name}
                              onChange={(e) => setLastName(e.target.value)}
                            />
                          </div>
                        </div>
                        <div class="form-group">
                          <input
                            type="email"
                            class="form-control form-control-user"
                            //  id="exampleInputEmail"
                            placeholder="Enter Email Address"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <div class="form-group">
                          <input
                            type="password"
                            class="form-control form-control-user"
                            /// id="exampleInputPassword"
                            placeholder="Enter password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                        <div class="form-group pb-3">
                          <input
                            type="password"
                            class="form-control form-control-user"
                            /// id="exampleRepeatPassword"
                            placeholder="Confirm password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => checkPassword(e)}
                          />
                        </div>
                        <button
                          onClick={RegisterForm}
                          className="btn btn-primary btn-user btn-block "
                        >
                          Register Now
                        </button>

                        <button
                          onClick={() => navigate("/")}
                          className="btn btn-secondary btn-user btn-block text-gray-600"
                        >
                          Login instead
                        </button>
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

export default withAuth(Register);
