import React from "react";

const UserModal = ({
  id,
  setId,

  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  role,
  setRole,
  handleAdd,
  handleUpdate,
  isEdit,
  handleAddClick,
}) => {
  return (
    <>
      <div className="container">
        {/* <button
          type="button"
          className="btn btn-primary mt-2 mr-4"
          data-toggle="modal"
          data-target="#exampleModal"
          onClick={handleAddClick}
          // style={{ position: "absolute", top: 0, right: 0 }}
        >
          Add
        </button> */}

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  User Details
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body text-secondary">
                <form>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="id"
                      hidden
                      value={id}
                      onChange={(event) => {
                        setId(event.target.value);
                      }}
                    />

                    <label>First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      value={firstName}
                      onChange={(event) => {
                        setFirstName(event.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      value={lastName}
                      onChange={(event) => {
                        setLastName(event.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      required="required"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value);
                      }}
                    />
                  </div>
                  {isEdit && (
                    <>
                      <div className="form-group">
                        <label>Password</label>
                        <input
                          type="password"
                          required="required"
                          className="form-control"
                          id="password"
                          value={password}
                          onChange={(event) => {
                            setPassword(event.target.value);
                          }}
                        />
                      </div>
                      <div className="form-group">
                        <label>Confirm Password</label>
                        <input
                          type="password"
                          required="required"
                          className="form-control"
                          id="confirmpassword"
                          value={confirmPassword}
                          onChange={(event) => {
                            setConfirmPassword(event.target.value);
                          }}
                        />
                      </div>
                    </>
                  )}
                </form>
                {!isEdit && (
                  <div className="form-group">
                    <label>Role</label>
                    <input
                      type="text"
                      className="form-control"
                      id="role"
                      value={role}
                      onChange={(event) => {
                        setRole(event.target.value);
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-dark"
                  data-dismiss="modal"
                >
                  Close
                </button>

                {isEdit ? (
                  <button
                    className="btn btn-warning "
                    onClick={handleUpdate}
                    data-dismiss="modal"
                  >
                    Update
                  </button>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={handleAdd}
                    data-dismiss="modal"
                  >
                    Save changes
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserModal;
