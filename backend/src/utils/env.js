import "dotenv/config";

export const development = "development";
export const production = "production";

export const NODE_ENV = process.env.NODE_ENV || production;
export const PORT = process.env.PORT || 3000;
export const MONGO_URI = process.env.MONGO_URI;
export const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY || "key";
export const JWT_EXPIRES_IN_MINUTE = Number(
    process.env.JWT_EXPIRES_IN_MINUTE || 2880
);

const checkEnv = (env, name) => {
    if (!env) {
        console.error(`${name} can't be null in .env`.red.underline.bold);
        process.exit(1);
    } else {
        console.log(`ENV FOUND: ${name} = ${env}`);
    }
};

checkEnv(PORT, "PORT");
checkEnv(NODE_ENV, "NODE_ENV");
checkEnv(MONGO_URI, "MONGO_URI");
checkEnv(JWT_PRIVATE_KEY, "JWT_PRIVATE_KEY");
checkEnv(JWT_EXPIRES_IN_MINUTE, "JWT_EXPIRES_IN_MINUTE");
