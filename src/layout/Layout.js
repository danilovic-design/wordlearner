import * as React from "react";
import Navigation from "../pages/navigation/Navigation";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/login/Login";
import Dictionaries from "../pages/dictionaries/Dictionaries";
import Wordlist from "../pages/wordlist/Wordlist";
import Tester from "../pages/tester/Tester";
import Notfound from "../pages/notfound/Notfound";
import Profile from "../pages/profile/Profile";
import ProtectedRoute from "../contexts/ProtectedRoute";
import PublicRoute from "../contexts/PublicRoute";
import SignUp from "../pages/signup/Signup";
import UnderConstruction from "../pages/underconstruction/Underconstruction";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { StateContext } from "../contexts/Statecontext";
import { CookieContext } from "../contexts/Cookiecontext";
import LandingPage from "../pages/landingpage/Landingpage";
import { PAGEROOT } from "../database/deploy";
import ForgotPassword from "../pages/forgotpassword/Forgotpassword";
import CookieConsent from "../pages/cookieconsent/Cookieconsent";

const CircularIndeterminate = function () {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "40px",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default function Layout() {
  const { isLoaded } = React.useContext(StateContext);
  const { cookiesConsented } = React.useContext(CookieContext);

  return (
    <div>
      <Navigation />
      {isLoaded ? (
        <Routes>
          <Route
            path={PAGEROOT}
            element={
              <PublicRoute>
                <LandingPage />
              </PublicRoute>
            }
          />
          <Route
            path={`${PAGEROOT}dictionaries`}
            element={
              <ProtectedRoute>
                <Dictionaries />
              </ProtectedRoute>
            }
          />
          <Route
            path={`${PAGEROOT}signup`}
            element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            }
          />
          <Route
            path={`${PAGEROOT}login`}
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path={`${PAGEROOT}resetpassword`}
            element={
              <PublicRoute>
                <ForgotPassword />
              </PublicRoute>
            }
          />
          <Route
            path={`${PAGEROOT}dictionary/:dictId`}
            element={
              <ProtectedRoute>
                <Wordlist />
              </ProtectedRoute>
            }
          />
          <Route
            path={`${PAGEROOT}test/:dictId`}
            element={
              <ProtectedRoute>
                <Tester />
              </ProtectedRoute>
            }
          />
          <Route
            path={`${PAGEROOT}profile`}
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path={`${PAGEROOT}cookiepolicy`}
            element={
              <ProtectedRoute>
                <UnderConstruction />
              </ProtectedRoute>
            }
          />

          <Route path={`${PAGEROOT}*`} element={<Notfound />} />
        </Routes>
      ) : (
        <CircularIndeterminate />
      )}
      {!cookiesConsented && <CookieConsent />}
    </div>
  );
}
