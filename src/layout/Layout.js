import React from "react";
import Login from "../pages/login/Login";
import Navigation from "../pages/navigation/Navigation";
import { Route, Routes } from "react-router-dom";
import Dictionaries from "../pages/dictionaries/Dictionaries";
import Wordlist from "../pages/wordlist/Wordlist";

export default function Layout() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Dictionaries />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dictionary" element={<Wordlist />} />
      </Routes>
    </div>
  );
}
