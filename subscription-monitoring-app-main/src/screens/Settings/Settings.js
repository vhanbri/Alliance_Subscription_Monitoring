import { useState, useEffect } from "react";

import Select from "react-select";
import Template from "../../components/Template/Template";
import useUsers from "../Users/useUsers";
import useSettings from "./useSettings";

const Settings = () => {
  const {
    fetchDefaultDaysExpiry,
    defaultDaysExpiry,
    handleOnUpdateDefaultDays,
    handleOnUpdateReminderRecipients,
  } = useSettings();
  const { users } = useUsers();

  const [reminderRecipients, setReminderRecipients] = useState([]);
  const [newDefaultDaysExpiry, setNewDefaultDaysExpiry] = useState(null);

  useEffect(() => {
    fetchDefaultDaysExpiry();
  }, [defaultDaysExpiry, fetchDefaultDaysExpiry]);

  useEffect(() => {
    setReminderRecipients(() => users.filter((u) => u.remind));
  }, [users]);

  return (
    <>
      <Template>
        <div className="card mb-3 col-xl-5" styles={{ maxWidth: "18rem" }}>
          <div className="card-body text-secondary">
            <img
              src={process.env.PUBLIC_URL + "/images/setting.png"}
              className="d-none d-lg-inline"
              alt="logosetting"
            />
            <span
              className="h3 text-gray-800 pl-3 pt-2"
              style={{
                display: "inline-flex",
                verticalAlign: "middle",
                alignItems: "center",
                minHeight: "12vh",
              }}
            >
              Configure Settings
            </span>
            <form className="form-group">
              <label className="my-1 mr-2" htmlFor="daysOfExpiry">
                Default days of Expiry
              </label>
              <select
                className="custom-select my-1 mr-sm-2"
                id="daysOfExpiry"
                value={
                  newDefaultDaysExpiry
                    ? newDefaultDaysExpiry
                    : defaultDaysExpiry
                }
                onChange={(e) => setNewDefaultDaysExpiry(e.target.value)}
              >
                <option value="0">Select</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="30">30</option>
              </select>

              <div className="text-right" style={{ paddingTop: 10 }}>
                <button
                  type="submit"
                  className="btn btn-dark btn-user btn-block"
                  onClick={(e) =>
                    handleOnUpdateDefaultDays(e, newDefaultDaysExpiry)
                  }
                >
                  Save
                </button>
              </div>
            </form>

            <form className="form-group">
              <label className="my-1 mr-2 mt-4" htmlFor="reminder">
                Set Recipients to remind
              </label>

              <Select
                value={reminderRecipients.map((u) => ({
                  value: u.id,
                  label: u.name,
                }))}
                isMulti
                name="users"
                options={users.map((u) => ({ value: u.id, label: u.name }))}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={(selectedOptions) => {
                  const selectedUsers = selectedOptions.map((option) => {
                    return {
                      id: option.value,
                      name: option.label,
                      remind: true,
                    };
                  });

                  setReminderRecipients(selectedUsers);
                }}
              />

              <div style={{ paddingTop: 10 }}>
                <button
                  type="submit"
                  className="btn btn-primary btn-user btn-block"
                  onClick={(e) =>
                    handleOnUpdateReminderRecipients(e, reminderRecipients)
                  }
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </Template>
    </>
  );
};

export default Settings;
