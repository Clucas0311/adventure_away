import React, { useState, useEffect } from "react";
import { Home, Vacations } from "./components";
import { Route, Switch, Link } from "react-router-dom";
import { fetchVacations } from "./api/api";
import "./App.css";
const App = () => {
  const [vacation, setVacation] = useState([]);

  useEffect(() => {
    const getVacations = async () => {
      try {
        const result = await fetchVacations();
        setVacation(result);
      } catch (error) {
        console.error(error);
      }
    };
    getVacations();
  }, []);
  return (
    <div className="container">
      <nav className="ui secondary menu">
        <Link className="item" to="/">
          Home
        </Link>
        <Link className="item" to="/vacations">
          Vacations
        </Link>
      </nav>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route className="item" path="/vacations">
          <Vacations vacation={vacation} />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
