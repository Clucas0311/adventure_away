import React from "react";
import VacationItem from "./VacationItem";
import { Link } from "react-router-dom";
import { deleteVacation } from "../api/api";

import "./Vacations.css";

const Vacations = ({ vacation, setVacation, token }) => {
  console.log("vacations", vacation);
  
  const handleDeleteClick = async (vacationId) => {
    await deleteVacation(token, vacationId);
    setVacation((prevVacations) =>
      prevVacations.filter((vacation) => vacation.id !== vacationId)
    );
  };
  
  return (
    <>
      <Link to="/vacations/create" className="ui button">
        Create Vacation
      </Link>
      <div className="vacations-container">
        {vacation.map((item) => {
          return (
            <VacationItem key={item.id} vacation={item}
              headerElement={item.isCreator ? <div className="right floated aligned tiny header">Mine</div> : null}
            >
              {item.isCreator ? (
                <button
                  onClick={() => handleDeleteClick(item.id)}
                  className="negative ui button left floated"
                >
                  Delete
                </button>
              ) : null}
            </VacationItem>
          );
        })}
      </div>
    </>
  );
};

export default Vacations;
