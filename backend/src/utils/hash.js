import bcryptjs from "bcryptjs";

/**
 * Hashing string of data
 * @param {string} str
 * @returns
 */
export const hashString = async str => {
    const salt = await bcryptjs.genSalt(10);
    return await bcryptjs.hash(str, salt);
};

/**
 * Compare given string to given hash
 * @param {string} str
 * @param {string} hash
 * @returns
 */
export const compareHash = async (str, hash) => {
    return await bcryptjs.compare(str, hash);
};
