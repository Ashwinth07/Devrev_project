import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    employeeId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmpassword:{
      type: String,
      required: true,
    },
    contact: {
      type: Number,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    dailyFoodCount: {
      type: Number,
      default: 0,
    },
    costallocated:{
      type: Number,
      default: 0,
    },
    lastDailyUpdate: {
      type: Date,
      default: function() {
        const today = new Date();
        today.setDate(today.getDate() - 1);
        return today;
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
