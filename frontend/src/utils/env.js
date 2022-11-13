export const development = "development";
export const production = "production";

export const NODE_ENV = import.meta.env.VITE_NODE_ENV;
export const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL 
export const IMAGE_API_BASEURL = import.meta.env.VITE_IMAGE_API_BASEURL

const checkEnv = (env, name) => {
    if (!env) {
        console.error(`${name} can't be null in .env`.red.underline.bold);
        process.exit(1);
    } else {
        console.log(`ENV FOUND: ${name}=${env}`);
    }
};

checkEnv(NODE_ENV, "NODE_ENV");
checkEnv(BACKEND_API_URL, "BACKEND_API_URL");
checkEnv(IMAGE_API_BASEURL, "IMAGE_API_BASEURL");
