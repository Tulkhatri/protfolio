import axios from "./axios";
import { SkillId, SkillType } from "./types";

// export const storeSkill = async (body: SkillType) => {
export const storeSkill = async (body: FormData) => {
  // try {
  //   const response = await axios.post("api/storeSkill", body);
  try {
    const { data } = await axios({
      url: `api/storeSkill`,
      method: "POST",
      data: body,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (data) {
      return {
        data: data,
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

export const getSkill = async () => {
  try {
    const response = await axios.get("api/getSkill");
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

export const editSkill = async (body: SkillId) => {
  try {
    const response = await axios.post("api/getSingleSkill", body);
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

export const deleteSkill = async (body: SkillId) => {
  try {
    const response = await axios.post("api/deleteSkill", body);
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
