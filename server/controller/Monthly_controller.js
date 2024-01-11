import axios from 'axios';
import MonthlyEmployeeData from '../models/Monthly_data.js';

export const bulkUploadEmployees = async (req, res, next) => {
  try {
    const currentDate = new Date();
    const previousMonth = currentDate.getMonth();
    const previousYear = currentDate.getFullYear();

    const response = await axios.get('http://localhost:4000/api/auth/register');
    const previousMonthData = response.data;
    const today = new Date();
    const isFirstDayOfMonth = 1;
    const mappedData =previousMonthData.map((employee) => ({
      employeeId: employee.employeeId,
      name: employee.name,
      email: employee.email,
      contact: employee.contact,
      dailyFoodCount: employee.dailyFoodCount,
    }));
    console.log(mappedData)
    if (isFirstDayOfMonth) {
      const newMonthlyData = new MonthlyEmployeeData({
        month: today.getMonth() + 1,
        year: today.getFullYear(),
        employees:[],
      });
      newMonthlyData.employees.push(...mappedData);
      await newMonthlyData.save();

      res.status(200).json({ status: 'success', data: newMonthlyData });
    } else {
      res.status(200).json({ status: 'info', message: 'Not the starting day of the new month.' });
    }
  } catch (err) {
    next(err);
  }
};
