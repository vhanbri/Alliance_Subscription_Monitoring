import React from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
const Modal = ({
  id,
  setId,
  userId,
  setUserId,
  name,
  setName,
  description,
  setDescription,
  status,
  setStatus,
  dateCreated,
  setDateCreated,
  dateExpiry,
  setDateExpiry,
  handleAdd,
  handleUpdate,
  isEdit,
  handleAddClick,
}) => {
  // console.log(userId);
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
                  Subscription
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
                    <input
                      type="text"
                      className="form-control"
                      id="userId"
                      hidden
                      value={userId}
                      onChange={(event) => {
                        setUserId(event.target.value);
                      }}
                    />

                    <label>Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={name}
                      onChange={(event) => {
                        setName(event.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <input
                      type="text"
                      className="form-control"
                      id="description"
                      value={description}
                      onChange={(event) => {
                        setDescription(event.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label>DT Created</label>
                    <div>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        {/* <DateTimePicker
                          label="Date"
                          inputvariant="outlined"
                          id="dateCreated"
                          value={dateCreated}
                          fullWidth
                          onChange={(newValue) => {
                            console.log("dateCreated onChange", newValue);
                            setDateCreated(newValue);
                          }}
                        /> */}
                        <DateTimePicker
                          label="Date"
                          inputVariant="outlined"
                          id="dateCreated"
                          value={dateCreated}
                          fullWidth
                          onChange={(newValue) => setDateCreated(newValue)}
                        />
                      </LocalizationProvider>
                    </div>
                  </div>
                </form>
                <div className="form-group">
                  <label>DT Expiry</label>
                  <div>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DateTimePicker
                        label="Date"
                        inputVariant="outlined"
                        id="dateExpiry"
                        value={dateExpiry}
                        fullWidth
                        onChange={(newValue) => setDateExpiry(newValue)}
                      />
                    </LocalizationProvider>
                  </div>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <input
                    type="text"
                    className="form-control"
                    id="status"
                    value={status}
                    placeholder="Ongoing"
                    readOnly={true}
                    // onChange={(event) => {
                    //   setStatus(event.target.value);
                    // }}
                  />
                </div>
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

export default Modal;
