import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Login, Profile, Game, Home, Wiki, Register, Logout } from "./pages";
import store, { persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { ProtectedRoute, LoginRoute } from "./routes/ProtectedRoute";
import { Header } from "./components/header";
import useResponsive from "./utils/useResponsive";

function App() {
  const responsive = useResponsive();

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <Router>
          <Header responsive={responsive} />
          <Switch>
            <Route path="/wiki">
              <Wiki responsive={responsive} />
            </Route>
            <LoginRoute path="/login" component={Login} />
            <LoginRoute path="/register" component={Register} />
            <ProtectedRoute path="/profile" component={Profile} />
            <ProtectedRoute path="/game" component={Game} />
            <ProtectedRoute path="/logout" component={Logout} />
            <Route path="*">
              <Home responsive={responsive} />
            </Route>
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
