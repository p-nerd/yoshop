import { NODE_ENV, production } from "./envUtil.js";

export const log = stuff => {
    console.log(stuff);
};

export const logIfNotProduction = stuff => {
    // if (NODE_ENV !== production) {
    console.warn(stuff);
    // }
};
