import API from "../api/API";

const BASE_URL = "/SystemConfigurationAPI/";

const SettingsService = {
  list: () => API.get(`${BASE_URL}List`),
  edit: ({ days }) => API.put(`${BASE_URL}Edit?days=${days}`, { days }),
};

export default SettingsService;
