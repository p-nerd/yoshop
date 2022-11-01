import bcryptjs from "bcryptjs";

export const hashString = async str => {
    const salt = await bcryptjs.genSalt(10);
    return await bcryptjs.hash(str, salt);
};

export const compareHash = async (str, hash) => {
    return await bcryptjs.compare(str, hash);
};
