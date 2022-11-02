export const extractFromLocalStorage = (strName, defaultValue) => {
    const item = localStorage.getItem(strName);
    if (!item) return defaultValue;
    try {
        return JSON.parse(item);
    } catch (e) {
        return defaultValue;
    }
};

export const removeFromLocalStorage = strName => {
    localStorage.removeItem(strName);
};

export const addItemToLocalStorage = (strName, stuff) => {
    localStorage.setItem(strName, JSON.stringify(stuff));
};
