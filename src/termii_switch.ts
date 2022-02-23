import { deleteAxios, getAxios, postAndPatchAxios } from "./utils";
import axios, { AxiosResponse } from "axios";
import * as fs from 'fs';
import {MediaObjInterface, OptionsInterface} from './interfaces'

const FETCH_senderId_URL: string = "https://api.ng.termii.com/api/sender-id";
const REQUEST_senderId_URL: string =
  "https://api.ng.termii.com/api/sender-id/request";
const SEND_MESSAGE_URL: string = "https://api.ng.termii.com/api/sms/send";
const BULK_MESSAGE_URL: string = "https://api.ng.termii.com/api/sms/send/bulk";
const NUMBER_MESSAGE_SEND_URL: string =
  "https://api.ng.termii.com/api/sms/number/send";
const DEVICE_TEMPLATE_URL: string =
  "https://api.ng.termii.com/api/send/template";
const PHONEBOOKS_URL: string = "https://api.ng.termii.com/api/phonebooks";
const DELETE_CONTACT_URL: string =
  "https://api.ng.termii.com/api/phonebook/contact";
const SEND_CAMPAIGN_URL: string =
  "https://api.ng.termii.com/api/sms/campaigns/send";
const CAMPAIGNS_URL: string = "https://api.ng.termii.com/api/sms/campaigns";

export const getSenderIds = async (API_KEY: string) => {
  let response = await getAxios(`${FETCH_senderId_URL}?api_key=${API_KEY}`);
  return response;
};

export const requestNewSenderId = async (
  API_KEY: string,
  senderId: string,
  useCase: string,
  company: string
) => {
  let payload: object = {
    api_key: API_KEY,
    senderId: senderId,
    usecase: useCase,
    company: company,
  };

  let headers: object = {
    "Content-Type": "application/json",
  };
  let response = await postAndPatchAxios(
    REQUEST_senderId_URL,
    payload,
    headers,
    "post"
  );
  return response;
};

export const postMessage = async (
  API_KEY: string,
  numberTo: string,
  senderId: string,
  message: string,
  messageType: string,
  channel: string,
  mediaObj?: MediaObjInterface
) => {
  let payload: object = {};
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
    } else if (mediaObj.url && !mediaObj.caption) {
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
    } else {
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

  let headers: object = {
    "Content-Type": "application/json",
  };

  let response = await postAndPatchAxios(
    SEND_MESSAGE_URL,
    payload,
    headers,
    "post"
  );
  return response;
};

export const postMessageBulk = async (
  API_KEY: string,
  numbersTo: string[],
  senderId: string,
  message: string,
  messageType: string,
  channel: string
) => {
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

  let response = await postAndPatchAxios(
    BULK_MESSAGE_URL,
    payload,
    headers,
    "post"
  );
  return response;
};

export const numberMessageSend = async (
  API_KEY: string,
  numberTo: string,
  message: string
) => {
  let payload = {
    to: numberTo,
    sms: message,
    api_key: API_KEY,
  };

  let headers = {
    "Content-Type": "application/json",
  };

  let response = await postAndPatchAxios(
    NUMBER_MESSAGE_SEND_URL,
    payload,
    headers,
    "post"
  );
  return response;
};

export const templateSetter = async (
  API_KEY: string,
  phoneNumber: string,
  deviceId: string,
  templateId: string,
  data: object
) => {
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

  let response = await postAndPatchAxios(
    DEVICE_TEMPLATE_URL,
    payload,
    headers,
    "post"
  );
  return response;
};

export const getPhonebooks = async (API_KEY: string) => {
  let response = await getAxios(`${PHONEBOOKS_URL}?api_key=${API_KEY}`);
  return response;
};

export const makePhonebook = async (
  API_KEY: string,
  description: string,
  phonebookName: string
) => {
  let payload = {
    api_key: API_KEY,
    phonebookName: phonebookName,
    description: description,
  };

  let headers = {
    "Content-Type": "application/json",
  };

  let response = await postAndPatchAxios(
    PHONEBOOKS_URL,
    payload,
    headers,
    "post"
  );
  return response;
};

export const patchPhonebook = async (
  API_KEY: string,
  phonebookId: string,
  phonebookName: string,
  phonebookDescription: string
) => {
  let payload = {
    api_key: API_KEY,
    phonebook_name: phonebookName,
    description: phonebookDescription,
  };

  let headers = {
    "Content-Type": "application/json",
  };

  let response = postAndPatchAxios(
    `${PHONEBOOKS_URL}/${phonebookId}`,
    payload,
    headers,
    "patch"
  );
  return response;
};

export const removePhonebook = async (API_KEY: string, phonebookId: string) => {
  let response = await deleteAxios(
    `${PHONEBOOKS_URL}/${phonebookId}?api_key=${API_KEY}`
  );
  return response;
};

export const getContactsFromPhonebook = async (
  API_KEY: string,
  phonebookId
) => {
  let response = await getAxios(
    `${PHONEBOOKS_URL}/${phonebookId}/contacts?api_key=${API_KEY}`
  );
  return response;
};

export const addContact = async (
  API_KEY: string,
  phoneNumber: string,
  phonebookId: string,
  options?: OptionsInterface
) => {
  let payload: object;

  if (options) {
    payload = {
      api_key: API_KEY,
      phone_number: phoneNumber,
      ...options,
    };
  } else {
    payload = {
      api_key: API_KEY,
      phone_number: phoneNumber,
    };
  }

  let headers = {
    "Content-Type": "application/json",
  };

  let response = postAndPatchAxios(
    `${PHONEBOOKS_URL}/${phonebookId}/contacts`,
    payload,
    headers,
    "post"
  );
  return response;
};

export const addManyContacts = async (
  API_KEY: string,
  contactFile: string,
  countryCode: string,
  phonebookId: string
) => {
  let data = new FormData();
  data.append("api_key", API_KEY);
  data.append("contact_file", fs.readFileSync(contactFile, 'utf-8'));
  data.append("country_code", countryCode);
  try {
    let request: AxiosResponse = await axios.post(
      `${PHONEBOOKS_URL}/${phonebookId}/contacts?api_key=${API_KEY}`,
      data
    );
    let response: object = {
      status: "success",
      data: request.data,
    };
    return response;
  } catch (err) {
    let response: object = {
      status: "failed",
      message: err.response.statusText,
    };
  }
};

export const deleteOneContact = async (API_KEY: string, contactId: string) => {
  let response = deleteAxios(
    `${DELETE_CONTACT_URL}/${contactId}?api_key=${API_KEY}`
  );
  return response;
};

export const makeCampaign = async (
  API_KEY: string,
  countryCode: string,
  senderId: string,
  message: string,
  channel: string,
  messageType: string,
  phonebookId: string,
  campaignType: string,
  scheduleSmsStatus?: string,
  scheduleTime?: string
) => {
  let payload: object;

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
  } else if (!scheduleSmsStatus && scheduleTime) {
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
  } else if (scheduleSmsStatus && !scheduleTime) {
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

  let response = postAndPatchAxios(SEND_CAMPAIGN_URL, payload, headers, "post");
  return response;
};

export const getCampaigns = async (API_KEY: string) => {
  let response = getAxios(`${CAMPAIGNS_URL}?api_key=${API_KEY}`);
  return response;
};

export const getCampaignHistory = async (
  API_KEY: string,
  campaignId: string
) => {
  let response = getAxios(`${CAMPAIGNS_URL}/${campaignId}?api_key=${API_KEY}`);
  return response;
};
