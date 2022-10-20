import React, { useState, useEffect } from "react";
import { Home, Vacations } from "./components";
import { Route, Switch, Link } from "react-router-dom";
import { fetchVacations } from "./api/api";

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
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/vacations">Vacations</Link>
      </nav>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/vacations">
          <Vacations vacation={vacation} />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
