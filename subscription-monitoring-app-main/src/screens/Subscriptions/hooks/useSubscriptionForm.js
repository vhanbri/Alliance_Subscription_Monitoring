import { toast } from "react-toastify";
import SubscriptionService from "../../../services/SubscriptionService";
import { useContext } from "react";
import { UserContext } from "../../../providers/UserProvider";
import { formatDate } from "../../../utils";

const useSubscriptionForm = (props) => {
  const {
    subscriptions,
    setSubscriptions,
    subscription,
    setSubscription,
    setShowModal,
    clearFields,
    fetchSubscriptions,
  } = props;

  const { user } = useContext(UserContext);
  const today = new Date();
  today.setDate(today.getDate()); // set tomorrow's date

  const isValidDate = (currentDate) => {
    // check if the current date is greater than or equal to tomorrow's date
    return currentDate.isSameOrAfter(today, "day");
  };

  const handleAddSubscription = async (e) => {
    e.preventDefault();
    try {
      const s = {
        ...subscription,
        dateExpiry: formatDate(subscription.dateExpiry),
      };
      await SubscriptionService.add(s);
      setShowModal(false);
      clearFields();

      await fetchSubscriptions();
      toast.success("Subscription Added Successfully!");
    } catch (error) {
      if (error.response.status === 400) {
        // For errors from viewmodel validations
        error.response.data.errors &&
          Object.values(error.response.data.errors).forEach((err) =>
            toast.error(err[0])
          );

        // For error from model states
        error.response.data?.ModelStateErrors?.Errors.forEach((e) => {
          toast.error(e.ErrorMessage);
        });
      } else {
        toast.error("Something went wrong. Try again.");
      }
    }
  };

  const handleDeleteSubscription = async () => {
    try {
      await SubscriptionService.delete({ id: subscription.id });
      toast.success("Subscription Deleted!");
      setSubscription({});
      await fetchSubscriptions();
    } catch (error) {
      console.log("ERROR: ", error);

      toast.error(
        error?.response?.data?.message || "Something went wrong. Try again."
      );
    }
  };

  const handleUpdateSubscription = async (e) => {
    e.preventDefault();

    try {
      const subscriptionToUpdate = subscriptions.find(
        (s) => s.id === subscription.id
      );

      const updatedSubscription = {
        ...subscription,

        Name: subscription.name || subscriptionToUpdate.name,
        Description:
          subscription.description || subscriptionToUpdate.description,
        Status: subscription.status || subscriptionToUpdate.status,
        DateTimeExpiry:
          formatDate(subscription.dateExpiry) ||
          formatDate(subscriptionToUpdate.dateExpiry),
        UpdatedById: user.id,
        UserId: subscription.userId
      }; 

      await SubscriptionService.update(updatedSubscription);
      await fetchSubscriptions();
      toast.success("Subscription Updated!");
      setShowModal(false);
      clearFields();
    } catch (error) {
      console.log("ERROR: ", error);

      const message =
        error?.response?.data?.message || "Something went wrong. Try again.";
      toast.error(message);
    }
  };

  return {
    handleAddSubscription,
    handleDeleteSubscription,
    handleUpdateSubscription,
    isValidDate,
  };
};

export default useSubscriptionForm;
