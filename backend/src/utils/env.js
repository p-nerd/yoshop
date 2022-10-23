import "dotenv/config";

export const PORT = process.env.PORT || 3000;
export const NODE_ENV = process.env.NODE_ENV || "production";

const checkEnv = (env, name) => {
    if (!env) {
        throw new Error(`${name} can't be null in .env`);
    }
};

checkEnv(PORT, "PORT");
checkEnv(NODE_ENV, "NODE_ENV");
