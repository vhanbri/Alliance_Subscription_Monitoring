import {
  BrowserRouter as Router,
  Route,
  Routes,
  navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Login from "./screens/LoginPage/Login";
import Register from "./screens/RegistrationPage/Register";
import ForgotPass from "./screens/ForgotPassPage/ForgotPass";
import ConfirmForgotPass from "./screens/ForgotPassPage/ConfirmForgotPass";
import Template from "./components/Template/Template";
import Sidebar from "./components/Template/Sidebar";
import Navbar2 from "./components/Template/Navbar2";
import Dashboard from "./screens/Dashboard/Dashboard";
import Users from "./screens/Users/Users";
import Settings from "./screens/Settings/Settings";
import Page404 from "./components/Template/404Page";
import Sample from "./screens/Sample/Sample";
import PrivateRoute from "./hocs/PrivateRoute";
import { UserProvider } from "./providers/UserProvider";
import Subscriptions from "./screens/Subscriptions/Subscriptions";
import Analytics from "./screens/Analytics/Analytics";
import AdminRoute from "./hocs/AdminRoute";
import Profile from "./screens/Profile/Profile";

function App() {
  return (
    <UserProvider>
      <Router>
        <ToastContainer>
          <div className="App"></div>
        </ToastContainer>

        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route
            path="/forgot-password-form"
            element={<ConfirmForgotPass />}
          ></Route>
          <Route path="/forgot-password" element={<ForgotPass />}></Route>

          <Route
            path="/Template"
            element={
              <PrivateRoute>
                <Template />
              </PrivateRoute>
            }
          ></Route>
          <Route path="/nav" element={<Sidebar />}></Route>
          <Route path="/nav2" element={<Navbar2 />}></Route>
          <Route path="/404" element={<Page404 />}></Route>
          <Route path="/sample" element={<Sample />}></Route>

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/subscriptions"
            element={
              <PrivateRoute>
                <Subscriptions />
              </PrivateRoute>
            }
          ></Route>

          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          ></Route>

          {/* Admin Routes */}

          <Route
            path="/analytics"
            element={
              <AdminRoute>
                <Analytics />
              </AdminRoute>
            }
          ></Route>
          <Route
            path="/users"
            element={
              <AdminRoute>
                <Users />
              </AdminRoute>
            }
          ></Route>
          <Route
            path="/settings"
            element={
              <AdminRoute>
                <Settings />
              </AdminRoute>
            }
          ></Route>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
