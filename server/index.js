import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import authRoute from "./routes/authRoute.js";
import MonthRoute from "./routes/Monthly_route.js"
import axios from "axios";
dotenv.config();
const app = express();
mongoose.set("strictQuery", false);
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("mongodb connected");
  } catch (error) {
    throw error;
  }
};
const corsOpts = {
  origin: "*",
  methods: ["GET", "POST", "DELETE", "PUT"],
  allowedHeaders: ["Content-Type"],
};
app.use(cors(corsOpts));
mongoose.connection.on("disconnected", () => {
  console.log("Mongodb disconnected!");
});
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/month",MonthRoute);

// const checkDay = async () => {
//   try {
//     const apiUrl = 'http://localhost:4000/api/month/bulk-upload';
//     const response = await axios.post(apiUrl);
//     console.log('Response:', response.data);
//   } catch (error) {
//     console.error('Error:', error.message);
//   }
// };

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});
app.listen(4000, () => {
  connect();
  console.log("backend connected");
});
