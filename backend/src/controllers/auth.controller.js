const signup = async (req, res) => {
  res.send("SIGNUP");
};
const login = async (req, res) => {
  res.send("LOGIN");
};
const logout = async (req, res) => {
  res.send("LOGOUT");
};

const authController = { signup, login, logout };
export default authController;
