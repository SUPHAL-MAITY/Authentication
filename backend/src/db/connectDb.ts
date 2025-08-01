import mongoose from "mongoose";
import dotenv from "dotenv"


dotenv.config()

const DB_URI=process.env.DB_URI

export const connectDb = async () => {
  await mongoose
    .connect(`${DB_URI}`)
    .then(() => {
      console.log("mongodb connected ");
    })
    .catch((err) => {
      console.log(`error connecting to mongoDb`, err);
    });
};
