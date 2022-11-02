export const extractErrorMessage = (e, message) => {
    if (e.response && e.response.data.message) {
        message = e.response.data.message;
    }
    return message;
};

export const isObjectEmpty = obj => {
    if (!obj) return true;
    if (Object.keys(obj).length === 0) return true;
    return false;
};
