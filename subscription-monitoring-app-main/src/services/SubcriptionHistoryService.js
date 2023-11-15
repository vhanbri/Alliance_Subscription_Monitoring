import API from "../api/API";

const BASE_URL = "/SubscriptionHistoryAPI/";

const SubscriptionHistoryService = {
  list: ({ page, pageSize, subscriptionId }) =>
    API.get(
      `${BASE_URL}List?page=${page ?? 1}&pageSize=${
        pageSize ?? 100000
      }&SubscriptionId=${subscriptionId}&SortBy=Id&SortOrder=dsc`
    ),
  delete: ({ id }) => API.delete(`${BASE_URL}Delete?id=${id}`),
  update: ({ id, subscriptionId, dateTimeUpdated, remarks }) =>
    API.put(`${BASE_URL}Edit?id=${id}`, {
      id: id,
      subscriptionId: subscriptionId,
      dateTimeUpdated: dateTimeUpdated,
      remarks: remarks,
    }),
};

export default SubscriptionHistoryService;
