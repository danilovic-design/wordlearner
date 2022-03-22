import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
import { AuthProvider } from "./contexts/Authcontext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="App">
          <Layout />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
