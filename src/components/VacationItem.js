import React from "react";
import { Link } from "react-router-dom";
const VacationItem = ({ vacation }) => {
  console.log(vacation, "IN ITEMS");

  // TEMPORARY: for testing comments display without comment adding functionality
  // if (vacation.isCreator) {
  //   vacation.comments = [
  //     {
  //       "id": "5e8d1f2539e7a70017a7c968",
  //       "guest": {
  //         "id": "5e8d1f2539e7a70017a7c962",
  //         "username": "jane1234"
  //       },
  //       "content": "I am very much in the market for a fine violin."
  //     }
  //   ];
  // }

  return (
    <div className="ui card">
      <div className="content">
        <div className="left floated aligned header">{vacation.location}</div>
        {vacation.isCreator ?
          <div className="right floated aligned tiny header">Mine</div>
          : null}
        <div className="centered aligned description">
          <p>{vacation.description}</p>
          <div className="extra content">
            <div className=" center aligned header">
              <Link to="">View Location</Link>
            </div>
          </div>
        </div>
        <div role="list" className="ui divided relaxed list" style={{color: '#444'}}>
          {vacation.comments.map((comment) => {
            return (<div role="listitem" className="item">
              <b>{comment.guest.username}</b>
              <p className="content">{comment.content}</p>
            </div>);
          })}
        </div>
      </div>
    </div>
  );
};

export default VacationItem;
