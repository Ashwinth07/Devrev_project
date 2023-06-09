import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import authRoute from "./routes/authRoute.js";
import flightRoute from "./routes/flightRoute.js";
import bookingRoute from "./routes/bookingRoute.js";
// import { sendMailUsingNodemailer } from "./node mailer/nodemailer.js";

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
app.use("/api/flight",flightRoute);
app.use("/api/book",bookingRoute);
// app.post("/sendMail", sendMailUsingNodemailer);

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
