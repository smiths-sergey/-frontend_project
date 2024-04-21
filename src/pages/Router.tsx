import {
  Routes,
  Route,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import axios from "axios";
import LoginPage from "./LoginPage";
import NotFoundPage from "./NotFoundPage";
import ListPage from "./ListPage";
import AddToDoPage from "./AddToDoPage";
import { login as toLogin, logout } from "../stores/userSlice";
function Router() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isUserLoggedIn = useSelector((store: any) => store.user.isLoggedIn); 

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      dispatch(logout(null));
      return;
    }
    axios
      .get(`${window.location.origin}/api/user`)
      .then((response) => {
        dispatch(toLogin(response.data));
      })
      .catch((error) => {
        console.error("Ошибка при выполнении запроса:", error);
      });
  }, []);

  useEffect(() => {
    if (isUserLoggedIn) {
      if (location.pathname === "/login") {
        navigate("/");
      }
      return;
    }
    if (location.pathname === "/login") {
      return;
    }
    navigate("/login");
  }, [isUserLoggedIn]);

  return (
    <Routes>
      <Route
        path="/"
        element={isUserLoggedIn ? <ListPage /> : <Navigate to="/login" />}
      ></Route>
      <Route
        path="/addTodo"
        element={isUserLoggedIn ? <AddToDoPage /> : <Navigate to="/login" />}
      ></Route>
      <Route
        path="/login"
        element={isUserLoggedIn ? <Navigate to="/" /> : <LoginPage />}
      ></Route>

      <Route
        path="*"
        element={isUserLoggedIn ? <NotFoundPage /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}
export default Router;
