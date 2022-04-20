import { getAxios, postAndPatchAxios } from "./utils";

const SEND_TOKEN_URL: string = "https://api.ng.termii.com/api/sms/otp/send";
const SEND_TOKEN_VOICE_URL: string =
  "https://api.ng.termii.com/api/sms/otp/send/voice";
const SEND_TOKEN_VOICECALL_URL: string =
  "https://api.ng.termii.com/api/sms/otp/send/voice";
const SEND_TOKEN_VERIFYTOKEN_URL: string =
  "https://api.ng.termii.com/api/sms/otp/verify";
const SEND_TOKEN_IN_APP: string =
  "https://api.ng.termii.com/api/sms/otp/generate";

export const sendNewToken = async (
  API_KEY: string,
  messageType: string,
  numberTo: string,
  senderId: string,
  channel: string,
  pinAttempts: string,
  pinTimeToLive: number,
  pinLength: number,
  pinPlaceholder: string,
  messageText: string
) => {
  let data: object = {
    api_key: API_KEY,
    message_type: messageType,
    to: numberTo,
    from: senderId,
    channel: channel,
    pin_attempts: pinAttempts,
    pin_time_to_live: pinTimeToLive,
    pin_length: pinLength,
    pin_placeholder: pinPlaceholder,
    message_text: messageText,
    pin_type: "NUMERIC",
  };

  let headers: object = {
    "Content-Type": "application/json",
  };

  let response: object = await postAndPatchAxios(
    SEND_TOKEN_URL,
    data,
    headers,
    "post"
  );
  return response;
};

export const sendVoiceToken = async (
  API_KEY: string,
  phoneNumber: string,
  pinAttempts: number,
  pinTimeToLive: number,
  pinLength: number
) => {
  let payload: object = {
    api_key: API_KEY,
    phone_number: phoneNumber,
    pin_attempts: pinAttempts,
    pin_time_to_live: pinTimeToLive,
    pin_length: pinLength,
  };

  let headers: object = {
    "Content-Type": "application/json",
  };

  let response: object = await postAndPatchAxios(
    SEND_TOKEN_VOICE_URL,
    payload,
    headers,
    "post"
  );
  return response;
};

export const makeVoiceCall = async (
  API_KEY: string,
  phoneNumber: string,
  code: number,
  pinAttempts: number,
  pinTimeToLive: number,
  pinLength: number
) => {
  let payload: object = {
    api_key: API_KEY,
    phone_number: phoneNumber,
    code: code,
    pin_attempts: pinAttempts,
    pin_time_to_live: pinTimeToLive,
    pin_length: pinLength,
  };

  let headers: object = {
    "Content-Type": "application/json",
  };

  let response: object = await postAndPatchAxios(
    SEND_TOKEN_VOICECALL_URL,
    payload,
    headers,
    "post"
  );
  return response;
};

export const verifySentToken = async (
  API_KEY: string,
  pinId: string,
  pin: string
) => {
  let payload: object = {
    api_key: API_KEY,
    pin_id: pinId,
    pin: pin,
  };

  let headers: object = {
    "Content-Type": "application/json",
  };

  let response: object = await postAndPatchAxios(
    SEND_TOKEN_VERIFYTOKEN_URL,
    payload,
    headers,
    "post"
  );
  return response;
};

export const sendTokenInApp = async (
  API_KEY: string,
  pinType: string,
  phoneNumber: string,
  pinAttempts: number,
  pinTimeToLive: number,
  pinLength: number
) => {
  let payload: object = {
    api_key: API_KEY,
    pin_type: pinType,
    phone_number: phoneNumber,
    pin_attempts: pinAttempts,
    pin_time_to_live: pinTimeToLive,
    pin_length: pinLength,
  };

  let headers: object = {
    "Content-Type": "application/json",
  };

  let response: object = await postAndPatchAxios(
    SEND_TOKEN_IN_APP,
    payload,
    headers,
    "post"
  );
  return response;
};
