import React, { useState, useEffect, useContext, useCallback } from "react";
import { Nav } from "react-bootstrap";
import NotificationService from "../../services/NotificationService";
import { formatDate } from "../../utils";
import { UserContext } from "../../providers/UserProvider";

const Notif = () => {
  const [notifications, setNotifications] = useState([]);
  const { user } = useContext(UserContext);

  const handleOnNotificationClick = async (notification) => {
    try {
      await NotificationService.update({ notification });
      const index = notifications.findIndex((n) => n.id === notification.id); // Fix typo in comparison
      const updatedNotifications = [...notifications];
      updatedNotifications[index] = {
        ...updatedNotifications[index],
        viewed: true,
      };
      setNotifications(updatedNotifications);
    } catch (e) {
      console.log("Error viewing notification: ", notification, e);
    }
  };

  const handleNotificationDelete = async (e, notification) => {
    e.stopPropagation();
    try {
      await NotificationService.delete({ id: notification.id });
      const updatedNotifications = notifications.filter(
        (n) => n.id !== notification.id
      );
      setNotifications(updatedNotifications);
    } catch (e) {
      console.log("Error deleting notification: ", notification, e);
    }
  };

  const fetchNotifications = useCallback(async () => {
    try {
      const resp = await NotificationService.list({
        userId: user.id,
      });
      console.log("NOTIFICATIONS: ", resp.data.data);

      return resp.data.data;
    } catch (error) {
      console.log("Error fetching notifications: ", error);
    }
  }, [user.id]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchNotifications().then((data) => {
        setNotifications(data);
      });
    }, 2000);

    return () => {
      clearInterval(intervalId); // Clean up the interval on component unmount
    };
  }, [fetchNotifications]);

  return (
    <>
      <Nav.Item className="dropdown no-arrow mx-1">
        <Nav.Link
          className="nav-link dropdown-toggle"
          href="#"
          id="alertsDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <i className="fas fa-bell fa-fw"></i>
          <span className="badge badge-danger badge-counter">
            {notifications.filter((n) => n.viewed === false).length < 10
              ? notifications.filter((n) => n.viewed === false).length
              : "10+"}
          </span>
        </Nav.Link>
        <div
          className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
          aria-labelledby="alertsDropdown"
          style={{ maxHeight: "300px", overflowY: "auto" }}
        >
          <h6 className="dropdown-header">Notifications</h6>
          {notifications.map((n) => {
            return (
              <button
                key={n.id}
                className="dropdown-item d-flex align-items-center btn-primary"
                onClick={() => handleOnNotificationClick(n)}
              >
                <div>
                  <div className="small text-gray-500">
                    {formatDate(n.dateCreated)}
                  </div>
                  <span
                    className={n.viewed ? "text-gray-700" : "text-gray-900"}
                  >
                    {n.description}
                  </span>
                </div>
                <div
                  className="btn btn-danger btn-circle btn-sm ml-auto"
                  onClick={(e) => handleNotificationDelete(e, n)}
                >
                  <i className="fas fa-trash"></i>
                </div>
              </button>
            );
          })}
        </div>
      </Nav.Item>
    </>
  );
};

export default Notif;
