const User = require("./users.schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function generateAcessToken(user) {
  const userInfo = {
    id: user.id,
    role: user.role,
  };
  const token = jwt.sign(userInfo, process.env.TOKEN_SECRET);
  return token;
}

function loginWithEmail(email, password) {
  return User.findOne({ email }).then((user) => {
    const hashPwd = user.password;
    if (bcrypt.compareSync(password, hashPwd)) {
      const token = generateAcessToken(user);
      return { ...user.toJSON(), token };
    } else throw new Error("Password doesn't match");
  });
}

function register(userDetails) {
  const { password } = userDetails;
  const hashPassword = bcrypt.hashSync(password, 10);
  userDetails.password = hashPassword;
  return User.create(userDetails).then((userData) => {
    const token = generateAcessToken(userData);
    return { ...userData.toJSON(), token };
  });
}

module.exports = {
  register,
  loginWithEmail,
};
