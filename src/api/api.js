// Create a BASEURL for easy access
const BASEURL = "http://localhost:4000/api/2207-FTB-ET-WEB-PT";

// Endpoint for fetching all vacations --> in your case all posts
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
