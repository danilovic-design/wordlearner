import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/Authcontext";
import { DataProvider } from "./contexts/Datacontext";
import { StateProvider } from "./contexts/Statecontext";
import Layout from "./layout/Layout";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({});

function App() {
  return (
    <BrowserRouter>
      <StateProvider>
        <AuthProvider>
          <DataProvider>
            <ThemeProvider theme={theme}>
              <Layout />
            </ThemeProvider>
          </DataProvider>
        </AuthProvider>
      </StateProvider>
    </BrowserRouter>
  );
}

export default App;
