import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const addUser = async (req, res) => {
  try {
    const saltRounds = 10;

    bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
      if (err) {
        console.error("Error occurred while hashing:", err);
        console.error("Error adding user:", err);
        res.status(500).json({ error: "Internal Server Error" });
      }

      var userItem = {
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: hash,
        createdAt: new Date(),
      };

      var user = new User(userItem);
      await user.save();
      res.status(201).json(userItem);
    });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isValid = await bcrypt.compare(password, user.password);
    
    if (!isValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const secret_key = process.env.JWT_SECRET_KEY;
    let payload = { user: user.email }; // Assuming only the email is needed
    let token = jwt.sign(payload, secret_key);

    res.status(200).json({ message: "Login successful", token: token });
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (!users || users.length === 0) {
      return res.status(404).json({ error: "Users Not Found" });
    }
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUserName = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    console.log(user);
    if (!user) {
      return res.status(404).json({ error: "User Not Found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ error: "User Not Found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "user Deleted sussesfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { getUsers, getUserName, addUser, updateUserById, deleteUserById,login };


// projuctins  https://www.mongodb.com/docs/manual/tutorial/project-fields-from-query-results/#return-all-fields-in-matching-documents