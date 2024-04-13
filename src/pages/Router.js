import {
  Routes,
  Route,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import LocalityPage from "./LocalityPage";
import LoginPage from "./LoginPage";
import AboutPage from "./AboutPage";
import NotFoundPage from "./NotFoundPage";
function Router() {
  const navigate = useNavigate();
  const location = useLocation();
  const isUserLoggedIn = useSelector((store) => store.login.isLoggedIn);
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
        element={isUserLoggedIn ? <LocalityPage /> : <Navigate to="/login" />}
      ></Route>
      <Route
        path="/about"
        element={isUserLoggedIn ? <AboutPage /> : <Navigate to="/login" />}
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
