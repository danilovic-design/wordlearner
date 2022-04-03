import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/Authcontext";
import { DataProvider } from "./contexts/Datacontext";
import { StateProvider } from "./contexts/Statecontext";
import Layout from "./layout/Layout";

function App() {
  return (
    <BrowserRouter>
      <StateProvider>
        <AuthProvider>
          <DataProvider>
            <Layout />
          </DataProvider>
        </AuthProvider>
      </StateProvider>
    </BrowserRouter>
  );
}

export default App;
