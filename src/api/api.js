const BASEURL = "http://localhost:4000/api/2207-FTB-ET-WEB-PT";

export const fetchVacations = async () => {
  try {
    const response = await fetch(`${BASEURL}/vacations`);
    console.log("----------THIS IS THE RESPONSE------", response);
    const { data } = await response.json();
    console.log("THIS IS DATA", data.vacations);
    return data.vacations;
  } catch (error) {
    console.error("There was an error fetching vacations", error);
  }
};

export const registerUser = async (username, password) => {
  try {
    const response = await fetch(`${BASEURL}/guests/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        guest: {
          username,
          password,
        },
      }),
    });
    console.log("RESPONSE------>", response);
    const data = await response.json();
    console.log("------------data------------", data);
    return data;
  } catch (error) {
    console.error("There was an error registering the user", error);
  }
};
