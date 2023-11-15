import React, { useState, useEffect } from "react";
import UserService from "../../services/UserService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgotPass = () => {
  const navigate = useNavigate();

  const [showVerificationCode, setShowVerificationCode] = useState(false);
  const [timer, setTimer] = useState(60);
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [resendButtonDisabled, setResendButtonDisabled] = useState(false);

  useEffect(() => {
    let countdown;
    if (timer > 0) {
      countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setResendButtonDisabled(false);
    }
    return () => clearInterval(countdown);
  }, [timer]);

  const handleSendVerificationCode = (e) => {
    e.preventDefault();

    setResendButtonDisabled(true);

    UserService.forgotPassword({ email })
      .then((_) => {
        setShowVerificationCode(true);

        setTimer(60);

        let countdown = setInterval(() => {
          setTimer((prevTimer) => {
            if (prevTimer === 0) {
              clearInterval(countdown);
              setResendButtonDisabled(false);
              return 0;
            } else if (prevTimer > 0) {
              return prevTimer - 1;
            }
          });
        }, 1000);
        setTimeout(() => clearInterval(countdown), 60000);
      })
      .catch((e) => {
        console.log("Forgot Password > ", e);

        toast.error("Failed to send verification code. Try again.");
        setEmail("");
      });
  };
  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await UserService.verifyForgotPassword({
        email,
        forgotPasswordCode: verificationCode,
      });

      navigate("/forgot-password-form", {
        state: {
          email: email,
          verificationCode: verificationCode,
        },
      });
    } catch (e) {
      toast.error("Invalid Forgot Password Code. Try again.");
      setVerificationCode("");
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleVerificationCodeChange = (e) => {
    setVerificationCode(e.target.value);
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
                          Forgot your Password?
                        </h1>
                        {!showVerificationCode ? (
                          <>
                            <p className="mb-4">
                              It happens, and it’s okay. Just give us your email
                              so we can send you a link to reset your password.
                            </p>
                            <form className="user">
                              <div className="form-group">
                                <input
                                  type="email"
                                  className="form-control form-control-user"
                                  id="exampleInputEmail"
                                  aria-describedby="emailHelp"
                                  placeholder="Enter Email"
                                  value={email}
                                  onChange={handleEmailChange}
                                />
                              </div>
                              <button
                                type="button"
                                className="btn btn-dark btn-user btn-block"
                                onClick={handleSendVerificationCode}
                              >
                                Send Verification Code
                              </button>
                            </form>
                          </>
                        ) : (
                          <>
                            <p className="mb-4">
                              We have sent a verification code to your email.
                              Please enter the code below to reset your
                              password.
                            </p>

                            <form className="user">
                              <div className="form-group">
                                <input
                                  type="text"
                                  className="form-control form-control-user"
                                  id="exampleInputVerificationCode"
                                  placeholder="Enter Verification Code"
                                  value={verificationCode}
                                  onChange={handleVerificationCodeChange}
                                />
                              </div>
                              <button
                                className="btn btn-primary btn-user btn-block   "
                                onClick={handleResetPassword}
                              >
                                Reset Password
                              </button>
                              <button
                                type="button"
                                className="btn btn-outline-dark btn-user btn-block"
                                onClick={handleSendVerificationCode}
                                disabled={resendButtonDisabled}
                              >
                                {resendButtonDisabled
                                  ? `Resend Verification Code in ${timer}s`
                                  : "Resend Verification Code"}
                              </button>
                            </form>
                          </>
                        )}
                        <hr />
                        <form className="user">
                          <div className="form-group">
                            <div className="pb-5 pt-3 ">
                              <a
                                href="login"
                                className="btn btn-secondary btn-user btn-block text-gray-600 "
                              >
                                Back to Login
                              </a>
                            </div>
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
    </div>
  );
};

export default ForgotPass;
