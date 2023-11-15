// Used to call the API for user CRUD operations
import API from "../api/API";

const BASE_URL = "/UserAPI/";
const UserCrudServices = {
 adduser: ({firstName, lastName, email, password, confirmPassword,role})=>
  API.post(`${BASE_URL}Register`, {firstName, lastName, email, password, confirmPassword, role}),
update: ({ user }) =>
  API.put(`${BASE_URL}Edit?id=${user.id}`, {
    ...user,   
    viewed: true,
}),
delete: ({ id }) => API.delete(`${BASE_URL}Delete?id=${id}`),   
};

export default UserCrudServices
