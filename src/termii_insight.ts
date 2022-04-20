import { deleteAxios, getAxios, postAndPatchAxios } from "./utils";

const BALANCE_URL: string = "https://api.ng.termii.com/api/get-balance";
const SEARCH_URL: string = "https://api.ng.termii.com/api/check/dnd";
const STATUS_URL: string = "https://api.ng.termii.com/api/insight/number/query";
const HISTORY_URL: string = "https://api.ng.termii.com/api/sms/inbox";

export const checkBalance = async (API_KEY: string) => {
  let response: object = await getAxios(`${BALANCE_URL}?api_key=${API_KEY}`);
  return response;
};

export const checkNumber = async (API_KEY: string, phoneNumber: string) => {
  let response: object = await getAxios(
    `${SEARCH_URL}?api_key=${API_KEY}&phone_number=${phoneNumber}`
  );
  return response;
};

// export const getNumberStatus = async (API_KEY: string, phoneNumber: string, countryCode: string) => {
//     let payload: object = {
//       api_key: API_KEY,
//       phone_number: phoneNumber,
//       country_code: countryCode,
//     };

//     let headers: object = {
//       "Content-Type": "application/json",
//     };

//     let response: object = await getAxios()
// }

export const getFullHistory = async (API_KEY: string) => {
  let response: object = await getAxios(`${HISTORY_URL}?api_key=${API_KEY}`);
  return response;
};
