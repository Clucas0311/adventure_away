const BASEURL = "http://localhost:4000/api/2207-FTB-ET-WEB-PT";

const makeHeaders = (token) => {
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};

/********************* callAPI WITHOUT error handling *********************/
const callAPI = async (endpointPath, defaultOptions = {}) => {
  const { token, method, body } = defaultOptions;

  const options = {
    headers: makeHeaders(token),
  };

  if (method) {
    options.method = method;
  }

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${BASEURL}${endpointPath}`, options);
  const result = await response.json();

  return result;
};

export const fetchVacations = async (token) => {
  try {
    const { success, error, data } = await callAPI("/vacations", {
      token: token,
    });

    if (success) {
      return {
        error: null,
        vacations: data.vacations,
      };
    } else {
      return {
        error: error.message,
        vacations: [],
      };
    }
  } catch (error) {
    console.error("There was an error fetching vacations", error);

    return {
      error: "Failed to load Vacations",
      vacations: [],
    };
  }
};

export const registerUser = async (username, password) => {
  try {
    const { success, error, data } = await callAPI("/guests/register", {
      method: "POST",
      body: {
        guest: {
          username,
          password,
        },
      },
    });

    if (success) {
      return {
        error: null,
        token: data.token,
        message: data.message,
      };
    } else {
      return {
        error: error.message,
        token: null,
        message: null,
      };
    }
  } catch (error) {
    console.error("There was an error registering the user", error);

    return {
      error: "Registration Failed.",
      token: null,
      message: null,
    };
  }
};
export const loginUser = async (username, password) => {
  try {
    const { success, error, data } = await callAPI("/guests/login", {
      method: "POST",
      body: {
        guest: {
          username,
          password,
        },
      },
    });

    if (success) {
      return {
        error: null,
        token: data.token,
        message: data.message,
      };
    } else {
      return {
        error: error.message,
        token: null,
        message: null,
      };
    }
  } catch (error) {
    console.error("There was an error registering the user", error);

    return {
      error: "Registration Failed.",
      token: null,
      message: null,
    };
  }
};

export const fetchGuest = async (token) => {
  try {
    const { success, error, data } = await callAPI("/guests/me", {
      token: token,
    });

    if (success) {
      return {
        error: null,
        guest: data.guest,
      };
    } else {
      return {
        error: error.message,
        guest: null,
      };
    }
  } catch (error) {
    console.error("failed to fetch guest", error);

    return {
      error: "Failed to load Guest information",
      guest: null,
    };
  }
};

export const createVacation = async (token, description, location) => {
  try {
    const vacation = {
      description: description,
    };

    if (location) {
      vacation.location = location;
    }

    const { success, error, data } = await callAPI("/vacations", {
      token: token,
      method: "POST",
      body: {
        vacation: vacation,
      },
    });

    if (success) {
      return {
        error: null,
        vacation: data.vacation,
      };
    } else {
      return {
        error: error.message,
        vacation: null,
      };
    }
  } catch (error) {
    console.error("POST /vacations failed:", error);

    return {
      error: "Failed to create Vacation",
      vacation: null,
    };
  }
};

export const deleteVacation = async (token, vacationId) => {
  try {
    await fetch(`${BASEURL}/vacations/${vacationId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("DELETE /vacations/vacationId failed:", error);
  }
};

/********************* callAPI WITH error handling built in *********************/

// const callAPI = async (endpointPath, defaultOptions = {}) => {
//   const options = {
//     headers: makeHeaders(defaultOptions.token)
//   };

//   if (defaultOptions.method) {
//     options.method = defaultOptions.method;
//   }

//   if (defaultOptions.body) {
//     options.body = JSON.stringify(defaultOptions.body);
//   }

//   try {
//     const response = await fetch(`${BASEURL}${endpointPath}`, options);
//     const {success, error, data} = await response.json();

//     if (success) {
//       return {
//         success: success
//         error: null,
//         data: data
//       };
//     } else {
//       return {
//         success: success
//         error: error.message,
//         data: null
//       };
//     }
//   } catch (error) {
//     console.error(`Failed while calling ${endpointPath}:`, error);

//     return {
//       success: false,
//       error: defaultOptions.defaultError,
//       data: null
//     };
//   }
// };

// export const fetchVacations = async () => {
//   const {success, error, data} = await callAPI('/vacations', {
//     defaultError: 'Failed to load Vacations'
//   });

//   return {
//     error: error,
//     vacations: success ? data.vacations : []
//   };
// };

// export const registerUser = async (username, password) => {
//   const { success, error, data } = await callAPI('/guests/register', {
//     method: 'POST',
//     body: {
//       guest: {
//         username,
//         password,
//       },
//     },
//     defaultError: 'Registration Failed.'
//   });

//   return {
//     error: error,
//     token: success ? data.token : null
//   };
// };

// export const fetchGuest = async (token) => {
//   const { success, error, data } = await fetch('/guests/me', {
//     token: token,
//     defaultError: 'Failed to load Guest information.'
//   });

//   return {
//     error: error,
//     guest: success ? data.guest : null
//   };
// };

// export const createVacation = async (token, description, location) => {
//   const vacation = {
//     description: description
//   };

//   if (location) {
//     vacation.location = location;
//   }

//   const { success, error, data } = await callAPI('/vacations', {
//     token: token,
//     method: 'POST',
//     body: {
//       vacation: vacation
//     },
//     defaultError: 'Failed to create Vacation'
//   });

//   return {
//     error: error,
//     vacation: success ? data.vacation: null
//   };
// }
