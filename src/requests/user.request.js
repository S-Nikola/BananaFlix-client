import { apiUrl } from "./core.request";

// Convert the loginUser function to an async function
export const useLoginUserRequest = async (data) => {
  try {
    // Send a POST request to the login API with the provided username and password
    const response = await fetch(`${apiUrl}/login?Username=${data.access}&Password=${data.secret}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });

    // Parse the response data as JSON and return it
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    // If an error occurs, throw a new error with the error message
    throw new Error(error);
  }
};
