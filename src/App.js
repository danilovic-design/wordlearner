import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
import { AuthProvider } from "./contexts/Authcontext";
import { DataProvider } from "./contexts/Datacontext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <div className="App">
            <Layout />
          </div>
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
