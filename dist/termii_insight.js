"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFullHistory = exports.checkNumber = exports.checkBalance = void 0;
const utils_1 = require("./utils");
const BALANCE_URL = "https://api.ng.termii.com/api/get-balance";
const SEARCH_URL = "https://api.ng.termii.com/api/check/dnd";
const STATUS_URL = "https://api.ng.termii.com/api/insight/number/query";
const HISTORY_URL = "https://api.ng.termii.com/api/sms/inbox";
const checkBalance = async (API_KEY) => {
    let response = await (0, utils_1.getAxios)(`${BALANCE_URL}?api_key=${API_KEY}`);
    return response;
};
exports.checkBalance = checkBalance;
const checkNumber = async (API_KEY, phoneNumber) => {
    let response = await (0, utils_1.getAxios)(`${SEARCH_URL}?api_key=${API_KEY}&phone_number=${phoneNumber}`);
    return response;
};
exports.checkNumber = checkNumber;
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
const getFullHistory = async (API_KEY) => {
    let response = await (0, utils_1.getAxios)(`${HISTORY_URL}?api_key=${API_KEY}`);
    return response;
};
exports.getFullHistory = getFullHistory;
