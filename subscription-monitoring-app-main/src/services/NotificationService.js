import API from "../api/API";

const BASE_URL = "/NotificationAPI/";

const NotificationService = {
  list: ({ userId }) => API.get(`${BASE_URL}List?UserId=${userId}`),
  update: ({ notification }) =>
    API.put(`${BASE_URL}Edit?id=${notification.id}`, {
      ...notification,
      subscriptionId: notification.sub.Id,
      userId: notification.user.Id,
      viewed: true,
    }),
  delete: ({ id }) => API.delete(`${BASE_URL}Delete?id=${id}`),
};

export default NotificationService;
