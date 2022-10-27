import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createVacation } from "../api/api";

const VacationCreateForm = ({ token, setVacation }) => {
  const history = useHistory();
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  return (
    <form
      className="ui form"
      onSubmit={async (event) => {
        event.preventDefault();

        const { error, vacation } = await createVacation(
          token,
          description,
          location
        );

        if (vacation) {
          // isCreator property is not being created when form is submitted this why the delete button is not displaying
          vacation.isCreator = true;
          setVacation((prevVacations) => [...prevVacations, vacation]);
          setDescription("");
          setLocation("");
          history.push("/vacations");
        } else {
          setErrorMessage(error);
        }
      }}
    >
      <h2>Create Vacation</h2>

      <div className="field">
        <label htmlFor="description">Description</label>
        <input
          name="description"
          type="text"
          placeholder="A description of Vacation Spot"
          required
          autoComplete="off"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        ></input>
      </div>

      <div className="field">
        <label htmlFor="location">Location</label>
        <input
          name="location"
          type="text"
          placeholder="Where is this Vacation?"
          autoComplete="off"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
        ></input>
      </div>

      {errorMessage ? (
        <p className="ui negative message">{errorMessage}</p>
      ) : null}

      <button type="submit" className="ui button">
        Create
      </button>
    </form>
  );
};

export default VacationCreateForm;
