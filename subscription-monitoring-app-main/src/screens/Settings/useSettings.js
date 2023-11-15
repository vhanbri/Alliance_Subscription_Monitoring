import { useEffect, useState } from "react";
import SettingsService from "../../services/SettingsService";
import { toast } from "react-toastify";
import UserService from "../../services/UserService";

const useSettings = () => {
  const [defaultDaysExpiry, setDefaultDaysExpiry] = useState(0);

  const fetchDefaultDaysExpiry = async () => {
    try {
      const defaultDaysResp = await SettingsService.list();
      const defaultDays = defaultDaysResp.data[0].DefaultDaysExpiry;

      setDefaultDaysExpiry(defaultDays);
      return defaultDays;
    } catch (e) {
      console.log("fetchDefaultDaysExpiry: ", e);
    }
  };

  const handleOnUpdateDefaultDays = async (e, days) => {
    e.preventDefault();
    console.log("E: ", e, days);

    try {
      await SettingsService.edit({ days });
      setDefaultDaysExpiry(days);
      toast.success("Successfully updated default days of expiry!");
    } catch (e) {
      toast.error("Something went wrong. Try again.");
      console.log("handleOnUpdateDefaultDays: ", e);
    }
  };

  const handleOnUpdateReminderRecipients = async (e, recipients) => {
    e.preventDefault();

    try {
      await UserService.updateReminderRecipients({
        ids: recipients.map((r) => r.id),
      });
      toast.success("Successfully updated reminder recipients!");
    } catch (e) {
      toast.error("Something went wrong. Try again.");
      console.log("handleOnUpdateReminderRecipients: ", e);
    }
  };

  useEffect(() => {
    fetchDefaultDaysExpiry();
  }, []);

  return {
    fetchDefaultDaysExpiry,
    defaultDaysExpiry,
    setDefaultDaysExpiry,
    handleOnUpdateDefaultDays,
    handleOnUpdateReminderRecipients,
  };
};

export default useSettings;
