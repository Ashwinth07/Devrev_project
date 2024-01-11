import mongoose from "mongoose";
const { Schema } = mongoose;

const MonthlyEmployeeDataSchema = new Schema(
  {
    month: {
      type: Number, 
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    employees:{
      type:Object,
      employeeId: {
          type: String,
      },
      name: {
          type: String,
      },
        email: {
          type: String,
      },
      contact: {
          type: Number,
      },
      dailyFoodCount: {
          type: Number,
      },
  },
  },
  { timestamps: true }
);

export default mongoose.model('MonthlyEmployeeData', MonthlyEmployeeDataSchema);
