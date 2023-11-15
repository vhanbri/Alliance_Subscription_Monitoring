import API from "../api/API";

const BASE_URL = "/SubscriptionAPI/";

const SubscriptionService = {
  list: ({ page, pageSize, userId, status }) =>
    API.get(
      `${BASE_URL}List?Page=${page}&PageSize=${
        pageSize ?? 100000
      }&SubUserId=${userId}&SubStatus=${status}`
    ),
  add: ({ UserId, name, description, dateExpiry }) =>
    API.post(
      `${BASE_URL}Add?UserId=${UserId}&Name=${name}&Description=${description}&DateTimeExpiry=${dateExpiry}`
    ),
  delete: ({ id }) => API.delete(`${BASE_URL}Delete?subscriptionId=${id}`),
  update: ({
    id,
    Name,
    Description,
    Status,
    DateTimeExpiry,
    UserId,
    UpdatedById,
  }) =>
    API.put(
      `${BASE_URL}Edit?id=${id}&Name=${Name}&Description=${Description}&Status=${Status}&DateTimeExpiry=${DateTimeExpiry}&UserId=${UserId}&UpdatedById=${UpdatedById}`
    ),
};

export default SubscriptionService;
