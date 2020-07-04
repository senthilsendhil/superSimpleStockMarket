import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import { Navbar } from "./components/Navbar";
import DashboardPage from "./pages/DashboardPage";
import StocksPage from "./pages/StocksPage";
import TradesPage from "./pages/Trades";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={DashboardPage} />
        <Route exact path="/stocks" component={StocksPage} />
        <Route exact path="/trade" component={TradesPage} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;
