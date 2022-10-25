import React from "react";
import VacationItem from "./VacationItem";
import { Link } from "react-router-dom";

import "./Vacations.css";

const Vacations = ({ vacation, setVacation, token }) => {
  console.log("vacations", vacation);
  return (
    <>
      <Link to="/vacations/create" className="ui button">
        Create Vacation
      </Link>
      <div className="vacations-container">
        {vacation.map((item) => {
          return (
            <VacationItem
              key={item.id}
              vacation={item}
              setVacation={setVacation}
              token={token}
            />
          );
        })}
      </div>
    </>
  );
};

export default Vacations;
