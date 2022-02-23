"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCampaignHistory = exports.getCampaigns = exports.makeCampaign = exports.deleteOneContact = exports.addManyContacts = exports.addContact = exports.getContactsFromPhonebook = exports.removePhonebook = exports.patchPhonebook = exports.makePhonebook = exports.getPhonebooks = exports.templateSetter = exports.numberMessageSend = exports.postMessageBulk = exports.postMessage = exports.requestNewSenderId = exports.getSenderIds = void 0;
const utils_1 = require("./utils");
const axios_1 = require("axios");
const fs = require("fs");
const FETCH_senderId_URL = "https://api.ng.termii.com/api/sender-id";
const REQUEST_senderId_URL = "https://api.ng.termii.com/api/sender-id/request";
const SEND_MESSAGE_URL = "https://api.ng.termii.com/api/sms/send";
const BULK_MESSAGE_URL = "https://api.ng.termii.com/api/sms/send/bulk";
const NUMBER_MESSAGE_SEND_URL = "https://api.ng.termii.com/api/sms/number/send";
const DEVICE_TEMPLATE_URL = "https://api.ng.termii.com/api/send/template";
const PHONEBOOKS_URL = "https://api.ng.termii.com/api/phonebooks";
const DELETE_CONTACT_URL = "https://api.ng.termii.com/api/phonebook/contact";
const SEND_CAMPAIGN_URL = "https://api.ng.termii.com/api/sms/campaigns/send";
const CAMPAIGNS_URL = "https://api.ng.termii.com/api/sms/campaigns";
const getSenderIds = async (API_KEY) => {
    let response = await (0, utils_1.getAxios)(`${FETCH_senderId_URL}?api_key=${API_KEY}`);
    return response;
};
exports.getSenderIds = getSenderIds;
const requestNewSenderId = async (API_KEY, senderId, useCase, company) => {
    let payload = {
        api_key: API_KEY,
        senderId: senderId,
        usecase: useCase,
        company: company,
    };
    let headers = {
        "Content-Type": "application/json",
    };
    let response = await (0, utils_1.postAndPatchAxios)(REQUEST_senderId_URL, payload, headers, "post");
    return response;
};
exports.requestNewSenderId = requestNewSenderId;
const postMessage = async (API_KEY, numberTo, senderId, message, messageType, channel, mediaObj) => {
    let payload = {};
    if (mediaObj) {
        if (mediaObj.url && mediaObj.caption) {
            payload = {
                to: numberTo,
                from: senderId,
                sms: message,
                type: messageType,
                channel: channel,
                api_key: API_KEY,
                media: {
                    url: mediaObj.url,
                    caption: mediaObj.caption,
                },
            };
        }
        else if (mediaObj.url && !mediaObj.caption) {
            payload = {
                to: numberTo,
                from: senderId,
                sms: message,
                type: messageType,
                channel: channel,
                api_key: API_KEY,
                media: {
                    url: mediaObj.url,
                },
            };
        }
        else {
            payload = {
                to: numberTo,
                from: senderId,
                sms: message,
                type: messageType,
                channel: channel,
                api_key: API_KEY,
            };
        }
    }
    let headers = {
        "Content-Type": "application/json",
    };
    let response = await (0, utils_1.postAndPatchAxios)(SEND_MESSAGE_URL, payload, headers, "post");
    return response;
};
exports.postMessage = postMessage;
const postMessageBulk = async (API_KEY, numbersTo, senderId, message, messageType, channel) => {
    let payload = {
        to: numbersTo,
        from: senderId,
        sms: message,
        type: messageType,
        channel: channel,
        api_key: API_KEY,
    };
    let headers = {
        "Content-Type": "application/json",
    };
    let response = await (0, utils_1.postAndPatchAxios)(BULK_MESSAGE_URL, payload, headers, "post");
    return response;
};
exports.postMessageBulk = postMessageBulk;
const numberMessageSend = async (API_KEY, numberTo, message) => {
    let payload = {
        to: numberTo,
        sms: message,
        api_key: API_KEY,
    };
    let headers = {
        "Content-Type": "application/json",
    };
    let response = await (0, utils_1.postAndPatchAxios)(NUMBER_MESSAGE_SEND_URL, payload, headers, "post");
    return response;
};
exports.numberMessageSend = numberMessageSend;
const templateSetter = async (API_KEY, phoneNumber, deviceId, templateId, data) => {
    let payload = {
        phoneNumber: phoneNumber,
        deviceId: deviceId,
        templateId: templateId,
        api_key: API_KEY,
        data: data,
    };
    let headers = {
        "Content-Type": "application/json",
    };
    let response = await (0, utils_1.postAndPatchAxios)(DEVICE_TEMPLATE_URL, payload, headers, "post");
    return response;
};
exports.templateSetter = templateSetter;
const getPhonebooks = async (API_KEY) => {
    let response = await (0, utils_1.getAxios)(`${PHONEBOOKS_URL}?api_key=${API_KEY}`);
    return response;
};
exports.getPhonebooks = getPhonebooks;
const makePhonebook = async (API_KEY, description, phonebookName) => {
    let payload = {
        api_key: API_KEY,
        phonebookName: phonebookName,
        description: description,
    };
    let headers = {
        "Content-Type": "application/json",
    };
    let response = await (0, utils_1.postAndPatchAxios)(PHONEBOOKS_URL, payload, headers, "post");
    return response;
};
exports.makePhonebook = makePhonebook;
const patchPhonebook = async (API_KEY, phonebookId, phonebookName, phonebookDescription) => {
    let payload = {
        api_key: API_KEY,
        phonebook_name: phonebookName,
        description: phonebookDescription,
    };
    let headers = {
        "Content-Type": "application/json",
    };
    let response = (0, utils_1.postAndPatchAxios)(`${PHONEBOOKS_URL}/${phonebookId}`, payload, headers, "patch");
    return response;
};
exports.patchPhonebook = patchPhonebook;
const removePhonebook = async (API_KEY, phonebookId) => {
    let response = await (0, utils_1.deleteAxios)(`${PHONEBOOKS_URL}/${phonebookId}?api_key=${API_KEY}`);
    return response;
};
exports.removePhonebook = removePhonebook;
const getContactsFromPhonebook = async (API_KEY, phonebookId) => {
    let response = await (0, utils_1.getAxios)(`${PHONEBOOKS_URL}/${phonebookId}/contacts?api_key=${API_KEY}`);
    return response;
};
exports.getContactsFromPhonebook = getContactsFromPhonebook;
const addContact = async (API_KEY, phoneNumber, phonebookId, options) => {
    let payload;
    if (options) {
        payload = Object.assign({ api_key: API_KEY, phone_number: phoneNumber }, options);
    }
    else {
        payload = {
            api_key: API_KEY,
            phone_number: phoneNumber,
        };
    }
    let headers = {
        "Content-Type": "application/json",
    };
    let response = (0, utils_1.postAndPatchAxios)(`${PHONEBOOKS_URL}/${phonebookId}/contacts`, payload, headers, "post");
    return response;
};
exports.addContact = addContact;
const addManyContacts = async (API_KEY, contactFile, countryCode, phonebookId) => {
    let data = new FormData();
    data.append("api_key", API_KEY);
    data.append("contact_file", fs.readFileSync(contactFile, 'utf-8'));
    data.append("country_code", countryCode);
    try {
        let request = await axios_1.default.post(`${PHONEBOOKS_URL}/${phonebookId}/contacts?api_key=${API_KEY}`, data);
        let response = {
            status: "success",
            data: request.data,
        };
        return response;
    }
    catch (err) {
        let response = {
            status: "failed",
            message: err.response.statusText,
        };
    }
};
exports.addManyContacts = addManyContacts;
const deleteOneContact = async (API_KEY, contactId) => {
    let response = (0, utils_1.deleteAxios)(`${DELETE_CONTACT_URL}/${contactId}?api_key=${API_KEY}`);
    return response;
};
exports.deleteOneContact = deleteOneContact;
const makeCampaign = async (API_KEY, countryCode, senderId, message, channel, messageType, phonebookId, campaignType, scheduleSmsStatus, scheduleTime) => {
    let payload;
    if (scheduleSmsStatus && scheduleTime) {
        payload = {
            api_key: API_KEY,
            country_code: countryCode,
            sender_id: senderId,
            message: message,
            channel: channel,
            message_type: messageType,
            phonebook_id: phonebookId,
            delimiter: ",",
            remove_duplicate: "yes",
            campaign_type: campaignType,
            schedule_sms_status: scheduleSmsStatus,
            scheduleTime: scheduleTime,
        };
    }
    else if (!scheduleSmsStatus && scheduleTime) {
        payload = {
            api_key: API_KEY,
            country_code: countryCode,
            sender_id: senderId,
            message: message,
            channel: channel,
            message_type: messageType,
            phonebook_id: phonebookId,
            delimiter: ",",
            remove_duplicate: "yes",
            campaign_type: campaignType,
            scheduleTime: scheduleTime,
        };
    }
    else if (scheduleSmsStatus && !scheduleTime) {
        payload = {
            api_key: API_KEY,
            country_code: countryCode,
            sender_id: senderId,
            message: message,
            channel: channel,
            message_type: messageType,
            phonebook_id: phonebookId,
            delimiter: ",",
            remove_duplicate: "yes",
            campaign_type: campaignType,
            schedule_sms_status: scheduleSmsStatus,
        };
    }
    let headers = {
        "Content-Type": "application/json",
    };
    let response = (0, utils_1.postAndPatchAxios)(SEND_CAMPAIGN_URL, payload, headers, "post");
    return response;
};
exports.makeCampaign = makeCampaign;
const getCampaigns = async (API_KEY) => {
    let response = (0, utils_1.getAxios)(`${CAMPAIGNS_URL}?api_key=${API_KEY}`);
    return response;
};
exports.getCampaigns = getCampaigns;
const getCampaignHistory = async (API_KEY, campaignId) => {
    let response = (0, utils_1.getAxios)(`${CAMPAIGNS_URL}/${campaignId}?api_key=${API_KEY}`);
    return response;
};
exports.getCampaignHistory = getCampaignHistory;
