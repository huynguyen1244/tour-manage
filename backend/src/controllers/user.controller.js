const userService = require("../services/user.service");

const getUsers = async (req, res) => {
  const session = await mongoose.startSession();
  await session.commitTransaction();

  try {
    const users = await userService.getAllUsers();
    await session.commitTransaction();

    res.json(users);
  } catch (err) {
    await session.abortTransaction();

    res.status(500).json({ error: err.message });
  } finally {
    session.endSession();
  }
};

const getUser = async (req, res) => {
  const session = await mongoose.startSession();
  await session.commitTransaction();

  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    await session.commitTransaction();

    res.json(user);
  } catch (err) {
    await session.abortTransaction();

    res.status(500).json({ error: err.message });
  } finally {
    session.endSession();
  }
};

const createUser = async (req, res) => {
  const session = await mongoose.startSession();
  await session.commitTransaction();

  try {
    const newUser = await userService.createUser(req.body);
    await session.commitTransaction();

    res.status(201).json(newUser);
  } catch (err) {
    await session.abortTransaction();

    res.status(400).json({ error: err.message });
  } finally {
    session.endSession();
  }
};

const updateUser = async (req, res) => {
  const session = await mongoose.startSession();
  await session.commitTransaction();

  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    if (!updatedUser) return res.status(404).json({ error: "User not found" });
    await session.commitTransaction();

    res.json(updatedUser);
  } catch (err) {
    await session.abortTransaction();

    res.status(400).json({ error: err.message });
  } finally {
    session.endSession();
  }
};

const deleteUser = async (req, res) => {
  const session = await mongoose.startSession();
  await session.commitTransaction();

  try {
    const deleted = await userService.deleteUser(req.params.id);
    if (!deleted) return res.status(404).json({ error: "User not found" });
    await session.commitTransaction();

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    await session.abortTransaction();

    res.status(500).json({ error: err.message });
  } finally {
    session.endSession();
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
