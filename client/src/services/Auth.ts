import axios from "./axios";
import { UserType } from "./types";

export const loginUser = async (body: UserType) => {
  try {
    const response = await axios.post("api/login", body);
    if (response.data) {
      return {
        data: response.data,
        error: null,
      };
    } else {
      return {
        data: null,
        error: true,
      };
    }
  } catch (err) {
    return {
      data: null,

      error: "error occurred",
    };
  }
};
