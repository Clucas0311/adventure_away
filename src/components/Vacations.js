import React, {useState, useEffect} from "react";
import VacationItem from "./VacationItem";
import { Link } from "react-router-dom";
import { deleteVacation } from "../api/api";

import "./Vacations.css";

const Vacations = ({ vacation, setVacation, token }) => {
  console.log("vacations", vacation);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredVacations, setFilteredVacations] = useState(vacation);
  
  useEffect(() => {

    // only filter if searchTerm is not empty
    if (searchTerm) {

      const searchTerms = searchTerm.toLowerCase().trim().split(' ');
      const filtered = vacation.filter((vacationObject) => {

        // get the values in the vacation object that we want to filter
        const filterableValues = [
          vacationObject.description,
          vacationObject.location
        ];

        // loop through the values and check them against the search term one at a time
        for (let value of filterableValues) {
          const valueLower = value.toLowerCase().trim();

          for (let term of searchTerms) {

            // only match if the value and search term are non-empty strings (because matching against an empty string will always return true)
            if (valueLower.length > 0 && term.length > 0 && valueLower.includes(term)) {
              return true;
            }
          }
        }

        return false;
      });
      setFilteredVacations(filtered);
    } else {
      setFilteredVacations(vacation);
    }
  }, [searchTerm, vacation]);
  
  const handleDeleteClick = async (vacationId) => {
    await deleteVacation(token, vacationId);
    setVacation((prevVacations) =>
      prevVacations.filter((vacation) => vacation.id !== vacationId)
    );
  };
  
  return (
    <>
      <div className="ui icon input">
        <input type="text" placeholder="Search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)} />
          <i className="search icon"></i>
      </div>
      <Link to="/vacations/create" className="ui button">
        Create Vacation
      </Link>
      <div className="vacations-container">
        {filteredVacations.map((item) => {
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
