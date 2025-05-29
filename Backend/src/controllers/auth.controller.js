const { authService } = require("../services");

const register = async (req, res) => {
  try {
    const { user } = await authService.register(req.body);
    res.status(201).send({ user });
  } catch (error) {
    res.status(400).json({ message: error.message || "Registration failed" });
  }
};

const login = async (req, res) => {
  try {
    const { user, token } = await authService.login(req.body);
    res.status(200).send({ user, token });
  } catch (error) {
    res.status(401).json({ message: error.message || "Login failed" });
  }
};



module.exports = { register, login };
