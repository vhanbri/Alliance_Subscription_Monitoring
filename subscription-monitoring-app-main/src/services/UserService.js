import API from "../api/API";

const BASE_URL = "/UserAPI/";

const UserService = {
  login: ({ userName, password }) =>
    API.post(`${BASE_URL}GetToken`, { userName, password }),
  refresh: ({ email, refreshToken }) =>
    API.post(`${BASE_URL}RefreshToken`, {
      userName: email,
      refreshToken: refreshToken,
    }),
  listAdmin: ({ page, pageSize }) =>
    API.get(
      `${BASE_URL}AdminList?page=${page ?? 1}&pageSize=${pageSize ?? 100000}`
    ),
  listUser: ({ page, pageSize }) =>
    API.get(
      `${BASE_URL}UserList?page=${page ?? 1}&pageSize=${pageSize ?? 100000}`
    ),
  updateReminderRecipients: ({ ids }) =>
    API.post(`${BASE_URL}UpdateReminderRecipients`, { ids }),
  edit: ({ id, firstName, lastName, email }) =>
    API.put(`${BASE_URL}Edit?id=${id}`, { firstName, lastName, email }),
  changePassword: ({ id, oldPassword, newPassword, confirmNewPassword }) =>
    API.post(`${BASE_URL}ChangePassword?id=${id}`, {
      oldPassword,
      newPassword,
      confirmNewPassword,
    }),
  forgotPassword: ({ email }) =>
    API.post(`${BASE_URL}ForgotPassword?email=${email}`),
  verifyForgotPassword: ({ email, forgotPasswordCode }) =>
    API.post(`${BASE_URL}VerifyForgotPasswordCode`, {
      email,
      forgotPasswordCode,
    }),
  resetPassword: ({ password, confirmPassword, email, token }) =>
    API.post(`${BASE_URL}ResetPassword`, {
      password,
      confirmPassword,
      email,
      token,
    }),
};

export default UserService;
