import React from "react";
import VacationItem from "./VacationItem";
const Vacations = ({ vacation }) => {
  console.log("vacations", vacation);
  return (
    <div>
      {vacation.map((item) => {
        return <VacationItem key={item.id} vacation={item} />;
      })}
    </div>
  );
};

export default Vacations;
