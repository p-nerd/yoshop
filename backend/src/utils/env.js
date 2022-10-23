import * as dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT;

if (!PORT) {
    throw new Error("PORT can't be null in .env");
}
