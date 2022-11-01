import axios from "axios";

axios.defaults.baseURL = `http://localhost:3000/api`;

export const loginUser = async loginData => {
    try {
        const { data: user, status } = await axios.post(
            "/users/login",
            loginData
        );
        return { user, status };
    } catch (e) {
        if (e.response && e.response.data.message) {
            throw e.response.data.message;
        }
        throw "Login user request unsuccessful";
    }
};

export const registerUser = async registerData => {
    try {
        const { data: user, status } = await axios.post("/users", registerData);
        return { user, status };
    } catch (e) {
        if (e.response && e.response.data.message) {
            throw e.response.data.message;
        }
        throw "Register user request unsuccessful";
    }
};
