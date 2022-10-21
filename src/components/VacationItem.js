import React from "react";
import { Link } from "react-router-dom";
const VacationItem = ({ vacation }) => {
  console.log(vacation, "IN ITEMS");
  return (
    <div className="ui card">
      <div className="content">
        <div className="centered aligned header">{vacation.location}</div>
        <div className="centered aligned description">
          <p>{vacation.description}</p>
          <div className="extra content">
            <div className=" center aligned header">
              <Link to="">View Location</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VacationItem;
