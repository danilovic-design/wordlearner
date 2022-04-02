import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/Authcontext";
import { DataProvider } from "./contexts/Datacontext";
import Layout from "./layout/Layout";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <Layout />
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
