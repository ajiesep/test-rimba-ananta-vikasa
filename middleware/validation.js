const validateUserInput = (req, res, next) => {
  const { name, email, age } = req.body;

  if (!name || !email || typeof age !== "number") {
    return res.status(400).json({ error: "Invalid input" });
  }
  next();
};

module.exports = validateUserInput;
