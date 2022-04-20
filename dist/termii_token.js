"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendTokenInApp = exports.verifySentToken = exports.makeVoiceCall = exports.sendVoiceToken = exports.sendNewToken = void 0;
const utils_1 = require("./utils");
const SEND_TOKEN_URL = "https://api.ng.termii.com/api/sms/otp/send";
const SEND_TOKEN_VOICE_URL = "https://api.ng.termii.com/api/sms/otp/send/voice";
const SEND_TOKEN_VOICECALL_URL = "https://api.ng.termii.com/api/sms/otp/send/voice";
const SEND_TOKEN_VERIFYTOKEN_URL = "https://api.ng.termii.com/api/sms/otp/verify";
const SEND_TOKEN_IN_APP = "https://api.ng.termii.com/api/sms/otp/generate";
const sendNewToken = async (API_KEY, messageType, numberTo, senderId, channel, pinAttempts, pinTimeToLive, pinLength, pinPlaceholder, messageText) => {
    let data = {
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
    let headers = {
        "Content-Type": "application/json",
    };
    let response = await (0, utils_1.postAndPatchAxios)(SEND_TOKEN_URL, data, headers, "post");
    return response;
};
exports.sendNewToken = sendNewToken;
const sendVoiceToken = async (API_KEY, phoneNumber, pinAttempts, pinTimeToLive, pinLength) => {
    let payload = {
        api_key: API_KEY,
        phone_number: phoneNumber,
        pin_attempts: pinAttempts,
        pin_time_to_live: pinTimeToLive,
        pin_length: pinLength,
    };
    let headers = {
        "Content-Type": "application/json",
    };
    let response = await (0, utils_1.postAndPatchAxios)(SEND_TOKEN_VOICE_URL, payload, headers, "post");
    return response;
};
exports.sendVoiceToken = sendVoiceToken;
const makeVoiceCall = async (API_KEY, phoneNumber, code, pinAttempts, pinTimeToLive, pinLength) => {
    let payload = {
        api_key: API_KEY,
        phone_number: phoneNumber,
        code: code,
        pin_attempts: pinAttempts,
        pin_time_to_live: pinTimeToLive,
        pin_length: pinLength,
    };
    let headers = {
        "Content-Type": "application/json",
    };
    let response = await (0, utils_1.postAndPatchAxios)(SEND_TOKEN_VOICECALL_URL, payload, headers, "post");
    return response;
};
exports.makeVoiceCall = makeVoiceCall;
const verifySentToken = async (API_KEY, pinId, pin) => {
    let payload = {
        api_key: API_KEY,
        pin_id: pinId,
        pin: pin,
    };
    let headers = {
        "Content-Type": "application/json",
    };
    let response = await (0, utils_1.postAndPatchAxios)(SEND_TOKEN_VERIFYTOKEN_URL, payload, headers, "post");
    return response;
};
exports.verifySentToken = verifySentToken;
const sendTokenInApp = async (API_KEY, pinType, phoneNumber, pinAttempts, pinTimeToLive, pinLength) => {
    let payload = {
        api_key: API_KEY,
        pin_type: pinType,
        phone_number: phoneNumber,
        pin_attempts: pinAttempts,
        pin_time_to_live: pinTimeToLive,
        pin_length: pinLength,
    };
    let headers = {
        "Content-Type": "application/json",
    };
    let response = await (0, utils_1.postAndPatchAxios)(SEND_TOKEN_IN_APP, payload, headers, "post");
    return response;
};
exports.sendTokenInApp = sendTokenInApp;
