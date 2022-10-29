import React from "react";
import VacationItem from "./VacationItem";
import { Link } from "react-router-dom";

import "./Vacations.css";

const Vacations = ({ vacation, setVacation, token }) => {
  console.log("vacations", vacation);
  
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredVacations = vacation.filter((vacationObject) => {
    const searchTermLower = searchTerm.toLowerCase();
    
    if (vacationObject.description.toLowerCase().includes(searchTermLower)) {
      return true;
    } else if (vacationObject.location.toLowerCase().includes(searchTermLower)) {
      return true;
    }

    return false;
  });

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
