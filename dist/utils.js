"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAxios = exports.postAndPatchAxios = exports.getAxios = void 0;
const axios_1 = require("axios");
const getAxios = async (url) => {
    try {
        let data = await axios_1.default.get(url);
        let response = {
            status: "success",
            data: data.data,
        };
        return response;
    }
    catch (err) {
        if (err.code === "ENOTFOUND") {
            let data = {
                status: "failed",
                message: "Network Error",
            };
            return data;
        }
        else {
            let data = {
                status: "failed",
                message: err.response.statusText,
            };
            return data;
        }
    }
};
exports.getAxios = getAxios;
const postAndPatchAxios = async (url, payload, headers, method) => {
    try {
        let config = {
            headers,
        };
        let request;
        if (method === "post") {
            request = await axios_1.default.post(url, payload, config);
        }
        else if (method === "patch") {
            request = await axios_1.default.patch(url, payload, config);
        }
        let response = {
            status: "success",
            data: request.data,
        };
        return response;
    }
    catch (err) {
        let data = {
            status: "failed",
            message: err.response.statusText,
        };
        return data;
    }
};
exports.postAndPatchAxios = postAndPatchAxios;
const deleteAxios = async (url) => {
    try {
        let request = await axios_1.default.delete(url);
        let response = {
            status: "success",
            data: request.data,
        };
        return response;
    }
    catch (err) {
        let data = {
            status: "failed",
            message: err.response.statusText,
        };
        return data;
    }
};
exports.deleteAxios = deleteAxios;
