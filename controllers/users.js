import User from "../models/User.js";

export const getUsers = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
    // User.find({}, (err, users) => {
    //   if (err) {
    //     res.send("Something wrong");
    //   }
    //   res.json(users);
    // });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};
