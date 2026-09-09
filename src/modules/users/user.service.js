import user from "../../DB/models/users.model.js";

export const addUser = async (req, res,next) => {
    try {
 const userexist = await user.findOne({ where: { email: req.body.email } });
    if (userexist) {
        return res.status(400).json({ message: "User already exists" });
    }
    const { name, email, password, role } = req.body;
    const newUser = user.build({ name, email, password, role });
    await newUser.save();
    res.status(201).json({ message: "User created successfully", user: newUser });
} catch (error) {
    next(error);
}
};

export const getbyemail = async (req, res, next) => {
  try {
    const userexist = await user.findOne({ where: { email: req.query.email } });
    if (!userexist) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User found", user: userexist });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existingUser = await user.findByPk(id);

    if (existingUser) {
      await existingUser.update(req.body, { validate: false });
      return res.status(200).json({
        message: "User updated",
        user: existingUser
      });
    }
    const newUser = await user.create(
      { id, ...req.body },
      { validate: false }
    );

    res.status(201).json({
      message: "User created",
      user: newUser
    });

  } catch (error) {
    next(error);
  }
};

export const getUserBypk = async (req, res, next) => {
  try {
    const foundUser = await user.findByPk(req.params.id, {
      attributes: { exclude: ["role"] }
    });

    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User found", user: foundUser });
  } catch (error) {
    next(error);
  }
};