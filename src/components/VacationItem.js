import React from "react";
import { Link } from "react-router-dom";

const VacationItem = ({ vacation, headerElement, children }) => {
  // console.log(vacation, "IN ITEMS");

  return (
    <div className="ui card">
      <div className="content">
        <div className="left floated aligned header">{vacation.location}</div>
        {headerElement}
        <div className="centered aligned description">
          <p>{vacation.description}</p>
          <div className="extra content">
            <div className=" center aligned header">
              <Link to={`/vacations/${vacation.id}`}>View Location</Link>
            </div>
          </div>
        </div>
        {children}
        <div
          role="list"
          className="ui divided relaxed list"
          style={{ color: "#444", clear: 'both' }}
        >
          {vacation.comments.map((comment) => {
            return (
              <div key={comment.id} role="listitem" className="item">
                <b>{comment.guest.username}</b>
                <p className="content">{comment.content}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VacationItem;
