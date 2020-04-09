import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Registrasi from "./pages/registrasi";
import Login from "./pages/login";
import LupaPassword from "./pages/lupa-password";
import Landing from "./pages/landing";
import NotFound from "./pages/404";
import Chat from "./pages/private/chat";
import Pengaturan from "./pages/private/pengaturan";
import PrivateRoute from "./components/PrivateRoute";
import CssBaseline from "@material-ui/core/CssBaseline";

import FirebaseProvider from "./components/FirebaseProvider";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./config/theme";
import { SnackbarProvider } from "notistack";
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <CssBaseline />
        <FirebaseProvider>
          <Router>
            <Switch>
              <Route path="/" exact component={Landing} />
              <Route path="/registrasi" component={Registrasi} />
              <Route path="/login" component={Login} />
              <Route path="/lupa-password" component={LupaPassword} />
              <PrivateRoute path="/chat" component={Chat} />
              <PrivateRoute path="/pengaturan" component={Pengaturan} />
              <Route component={NotFound} />
            </Switch>
          </Router>
        </FirebaseProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
