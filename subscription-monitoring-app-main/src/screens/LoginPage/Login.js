import React, { useContext, useState } from "react";
import UserService from "../../services/UserService";
import { UserContext } from "../../providers/UserProvider";
import { useNavigate } from "react-router-dom";
import withAuth from "../../hocs/WithAuth";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await UserService.login({ userName: email, password });
      login(response.data);

      // Redirect the user to the protected route
      navigate("/dashboard");
    } catch (error) {
      console.log('error: ', error);
      if (error && error.response.data === "Invalid Credentials.")
        setErrorMessage("Invalid credentials.");
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
                        <h1 className="h4 text-gray-900 mb-5">Welcome!</h1>
                      </div>
                      <form className="user" onSubmit={handleSubmit}>
                        <div className="form-group">
                          <input
                            type="email"
                            className="form-control form-control-user"
                            id="exampleInputEmail"
                            aria-describedby="emailHelp"
                            placeholder="Enter email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="password"
                            className="form-control form-control-user"
                            id="exampleInputPassword"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                        {errorMessage && (
                          <div className="alert alert-danger" role="alert">
                            {errorMessage}
                          </div>
                        )}
                        <div className="form-group">
                          <div className="pb-4">
                            <a
                              href="forgot-password"
                              className="small"
                              style={{
                                color: "red",
                              }}
                            >
                              Forgot Password?
                            </a>
                          </div>
                        </div>
                        <button
                          href="/dashboard"
                          className="btn btn-dark btn-user btn-block"
                        >
                          Login
                        </button>
                        <hr />
                        <div className="pb-5">
                          <a
                            href="register"
                            className="btn btn-secondary btn-user btn-block text-gray-600"
                          >
                            Create an account
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

export default withAuth(Login);
