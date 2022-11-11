import { extractErrorMessage } from "../logic/commonLogic.js";
import { NODE_ENV, production } from "./envUtil.js";

export const log = stuff => {
    console.log(stuff);
};

export const logIfNotProduction = stuff => {
    if (NODE_ENV !== production) {
        console.warn(stuff);
    }
};

export const logReqNotProd = e => {
    const message = extractErrorMessage(e, "General request error");
    if (NODE_ENV !== production) {
        console.error(`REQUEST ERROR: ${message}`, e);
    }
    return message;
};
