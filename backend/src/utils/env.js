import "dotenv/config";

const checkEnv = (env, name) => {
    if (!env) {
        console.error(`${name} can't be null in .env`.red.underline.bold);
        process.exit(1);
    }
};

export const PORT = process.env.PORT || 3000;
export const NODE_ENV = process.env.NODE_ENV || "production";
export const MONGO_URI = process.env.MONGO_URI;

checkEnv(PORT, "PORT");
checkEnv(NODE_ENV, "NODE_ENV");
checkEnv(MONGO_URI, "MONGO_URI");
