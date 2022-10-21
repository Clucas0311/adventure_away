import React, { useState, useEffect } from "react";
import { Home, Vacations } from "./components";
import { Route, Switch, Link } from "react-router-dom";
import { fetchVacations } from "./api/api";

const App = () => {
  const [vacation, setVacation] = useState([]);

  // Use Effect - We want to fetch all data from the backend on the first load
  // that is why we have an empty dependency array
  useEffect(() => {
    const getVacations = async () => {
      try {
        // store all our vacations into the result variable
        const result = await fetchVacations();
        // update our state to have the new result array
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
