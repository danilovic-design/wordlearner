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

export default function Layout() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dictionaries />
            </ProtectedRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/resetpassword"
          element={
            <PublicRoute>
              <UnderConstruction />
            </PublicRoute>
          }
        />
        <Route
          path="/dictionary/:dictId"
          element={
            <ProtectedRoute>
              <Wordlist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/test/:dictId"
          element={
            <ProtectedRoute>
              <Tester />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Notfound />} />
      </Routes>
    </div>
  );
}
