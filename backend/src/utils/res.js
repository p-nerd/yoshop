export const eResponse = (res, status, message) => {
    return res.status(status).json({ message });
};

export const response = (res, status, data) => {
    res.status(status).json(data);
};
