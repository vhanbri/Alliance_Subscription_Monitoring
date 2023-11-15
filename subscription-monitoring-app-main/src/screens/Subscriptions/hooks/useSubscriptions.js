import { useState, useEffect, useContext } from "react";
import SubscriptionService from "../../../services/SubscriptionService";
import { toast } from "react-toastify";
import { UserContext } from "../../../providers/UserProvider";
import { ROLES } from "../../../constants";

const useSubscriptions = () => {
  const { user } = useContext(UserContext);
  const [subscriptions, setSubscriptions] = useState([]);
  const [subscription, setSubscription] = useState({});
  const [subscriptionHistories, setSubscriptionHistories] = useState({});
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    setIsFetching(true);
    try {
      const response = await SubscriptionService.list({
        page: 1,
        pageSize: 1000000,
        userId: user.role === ROLES.ADMIN ? null : user.id,
      });

      const subcriptionsData = response.data.data.map((subscriptionData) => {
        const {
          id,
          name,
          userId,
          firstName,
          lastName,
          description,
          status,
          dateCreated,
          dateExpiry,
        } = subscriptionData;

        const userName = firstName + " " + lastName;

        return {
          id,
          user,
          userId,
          userName,
          name,
          description,
          status,
          dateCreated,
          dateExpiry,
        };
      });

      setSubscriptions(subcriptionsData);
    } catch (error) {
      toast.error(error.message);
    }
    setIsFetching(false);
  };

  const fetchSubscriptionsWithStatus = async ({ status }) => {
    setIsFetching(true);
    try {
      const response = await SubscriptionService.list({
        page: 1,
        pageSize: 1000000,
        userId: user.role === ROLES.ADMIN ? null : user.id,
        status,
      });

      const subscriptionsData = response.data.data.map((subscriptionData) => {
        const {
          id,
          name,
          userId,
          firstName,
          lastName,
          description,
          status,
          dateCreated,
          dateExpiry,
        } = subscriptionData;

        const userName = firstName + " " + lastName;

        return {
          id,
          user,
          userId,
          userName,
          name,
          description,
          status,
          dateCreated,
          dateExpiry,
        };
      });

      setSubscriptions(subscriptionsData);
      return subscriptionsData;
    } catch (error) {
      toast.error(error.message);
    }
    setIsFetching(false);
  };

  return {
    subscriptions,
    setSubscriptions,
    subscription,
    setSubscription,
    fetchSubscriptions,
    fetchSubscriptionsWithStatus,
    isFetching,
    subscriptionHistories,
    setSubscriptionHistories,
  };
};

export default useSubscriptions;
