import bcrypt from "bcryptjs";
import User from "../models/User.js";


export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.confirmpassword, salt);
    const newUser = new User(req.body);
    await newUser.save();
    
    res.status(200).json({ status: "success", data: newUser });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.find({
      email: req.body.email,
      password: req.body.password,
    });
    if (user.length >= 1) {
      console.log(user);
      res.status(200).json({ status: "Success", data: user });
    } else {
      res.status(400).json(user);
    }
  } catch (err) {
    next(err);
  }
};
export const getregister = async (req, res, next) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const checkDailyUpdate = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    const today = new Date().toISOString().split('T')[0];

    console.log('Today:', today);
    console.log('User lastDailyUpdate:', user.lastDailyUpdate);
    if (user.lastDailyUpdate != undefined && user.lastDailyUpdate.toISOString().split('T')[0] === today) {
      console.log('Daily update already performed');
      return res.status(403).json({ message: 'Daily update already performed' });
    }

    console.log('Proceeding with the request');
    next();
  } catch (err) {
    console.error(err);
    next(err);
  }
};


export const incrementDailyFoodCount = async (req, res, next) => {
  const { userId } = req.params; 

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $inc: { dailyFoodCount: 1 }, $set: { lastDailyUpdate: new Date().toISOString().split('T')[0] } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Daily food count updated', user: updatedUser });
  } catch (err) {
    next(err);
  }
};

export const checkUpdated = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    const today = new Date().toISOString().split('T')[0];

    console.log('Today:', today);
    console.log('User lastDailyUpdate:', user.lastDailyUpdate);
    if (user.lastDailyUpdate !== undefined && user.lastDailyUpdate.toISOString().split('T')[0] !== today) {
      console.log('You have not booked today');
      return res.status(403).json({ message: 'You have not booked today' });
    }

    console.log('Proceeding with the request');
    next();
  } catch (err) {
    console.error(err);
    next(err);
  }
};
export const decrementDailyFoodCount = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $inc: { dailyFoodCount: -1 }, $set: { lastDailyUpdate: getPreviousDate(new Date()) } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Daily food count decremented', user: updatedUser });
  } catch (err) {
    next(err);
  }
};
export const getUserById = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ status: 'Success', data: user });
  } catch (err) {
    next(err);
  }
};

const getPreviousDate = (date) => {
  const previousDate = new Date(date);
  previousDate.setDate(previousDate.getDate() - 1);
  return previousDate.toISOString().split('T')[0];
};
export const updateDailyFoodCountToZero = async (req, res, next) => {
  try {
    const today = new Date();
    today.setDate(today.getDate() - 1);
    await User.updateMany({}, { $set: { dailyFoodCount: 0 ,lastDailyUpdate: today} });
    res.status(200).json({ message: 'Daily food counts updated to zero for all users.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update daily food counts.', details: error.message });
  }
};
export const updateCostAllocatedForAllUsers = async (req, res, next) => {
  const { newCostAllocated } = req.body;
  try {
    const updatedUsers = await User.updateMany({}, { $set: { costallocated: newCostAllocated } });

    if (!updatedUsers) {
      return res.status(404).json({ message: 'No users found' });
    }

    res.status(200).json({ message: 'Cost allocated updated for all users', updatedUsers });
  } catch (err) {
    next(err);
  }
};
export const get_users_by_page = async (req, res, next) => {
  try {
    const page = parseInt(req.params.page);
    const page_size = 20;

    if (page < 1 || isNaN(page)) {
      return res.status(400).json({ status: "Error", message: "Page number should be a valid number greater than 0" });
    }

    const offset = (page - 1) * page_size;
    const users = await User.find().skip(offset).limit(page_size);

    const serialized_users = users.map(user => ({
      _id: user._id,
      employeeId: user.employeeId,
      name: user.name,
      email: user.email,
      contact: user.contact,
      isAdmin: user.isAdmin,
      dailyFoodCount: user.dailyFoodCount,
      lastDailyUpdate: user.lastDailyUpdate ? user.lastDailyUpdate.toISOString().split('T')[0] : null
    }));

    return res.status(200).json({ status: "Success", data: serialized_users });
  } catch (err) {
    next(err);
  }
};
