import axios, { AxiosResponse } from "axios";

export const getAxios = async (url: string) => {
  try {
    let data: AxiosResponse = await axios.get(url);
    let response: object = {
      status: "success",
      data: data.data,
    };
    return response;
  } catch (err) {
    if (err.code === "ENOTFOUND") {
      let data: object = {
        status: "failed",
        message: "Network Error",
      };
      return data;
    } else {
      let data: object = {
        status: "failed",
        message: err.response.statusText,
      };
      return data;
    }
  }
};

export const postAndPatchAxios = async (
  url: string,
  payload: object,
  headers: object,
  method: string
) => {
  try {
    let config: object = {
      headers,
    };
    let request: AxiosResponse;

    if (method === "post") {
      request = await axios.post(url, payload, config);
    } else if (method === "patch") {
      request = await axios.patch(url, payload, config);
    }

    let response: object = {
      status: "success",
      data: request.data,
    };
    return response;
  } catch (err) {
    let data: object = {
      status: "failed",
      message: err.response.statusText,
    };
    return data;
  }
};

export const deleteAxios = async (url: string) => {
  try {
    let request: AxiosResponse = await axios.delete(url);
    let response: object = {
      status: "success",
      data: request.data,
    };
    return response;
  } catch (err) {
    let data: object = {
      status: "failed",
      message: err.response.statusText,
    };
    return data;
  }
};
