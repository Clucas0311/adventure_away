import React, { useState, useEffect } from "react";
import { Home, Vacations, AccountForm, VacationCreateForm } from "./components";
import { Route, Switch, Link, useHistory } from "react-router-dom";
import { fetchVacations, fetchGuest } from "./api/api";
import "./App.css";

const App = () => {
  const [vacation, setVacation] = useState([]);
  const [token, setToken] = useState(
    window.localStorage.getItem("token") || null
  );
  const [guest, setGuest] = useState(null);

  const history = useHistory();

  useEffect(() => {
    const getVacations = async () => {
      const { error, vacations } = await fetchVacations(token);

      if (error) {
        console.error(error);
      }

      setVacation(vacations);
    };
    getVacations();
  }, [token]);

  useEffect(() => {
    console.log("HERE");
    if (token) {
      const getGuest = async () => {
        const { guest } = await fetchGuest(token);
        setGuest(guest);
      };
      getGuest();
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      window.localStorage.setItem("token", token);
    } else {
      window.localStorage.removeItem("token");
    }
  }, [token]);

  const logOut = () => {
    setToken(null);
    setGuest(null);
    history.push("/");
  };

  return (
    <div className="container">
      <nav className="ui secondary menu">
        <Link className="item" to="/">
          Home
        </Link>
        <Link className="item" to="/vacations">
          Vacations
        </Link>
        <div className="right menu">
          {token ? (
            <button onClick={logOut} className="item">
              Log Out
            </button>
          ) : (
            <>
              <Link className="item" to="/account/login">
                Log In
              </Link>
              <Link className="item" to="/account/register">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
      <Switch>
        <Route exact path="/">
          <Home guest={guest} />
        </Route>
        <Route path="/vacations/create">
          <VacationCreateForm token={token} setVacation={setVacation} />
        </Route>
        <Route path="/vacations">
          <Vacations
            vacation={vacation}
            token={token}
            setVacation={setVacation}
          />
        </Route>
        <Route path="/account/:action">
          <AccountForm setToken={setToken} />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
