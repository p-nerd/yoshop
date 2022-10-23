import mongoose from "mongoose";
import colors from "colors";
import users from "./users.js";
import products from "./products.js";
import User from "../models/userModel.js";
import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";
import connectToMongoDB from "../utils/db.js";

connectToMongoDB();

const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUser = await User.insertMany(users);
        const adminUser = createdUser[0]._id;

        const sampleProducts = products.map(product => {
            return { ...product, user: adminUser };
        });
        await Product.insertMany(sampleProducts);

        console.log("Data imported!".green.inverse);
        process.exit();
    } catch (e) {
        console.log(`${e}`.red.inverse);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log("Data destroyed!".red.inverse);
        process.exit();
    } catch (e) {
        console.log(`${e}`.red.inverse);
        process.exit(1);
    }
};

if (process.argv[2] === "-d") {
    destroyData();
} else {
    importData();
}
