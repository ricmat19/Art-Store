const crypto = require("crypto");
const util = require("util");

const scrypt = util.promisify(crypto.scrypt);

//insures that the .env file is only run in a development environment and not a production environment
if (process.env.NODE_ENV !== "production") {
  //requires the the .env file configuration be run first hiding all info hidden via the .env file
  require("dotenv").config();
}

//Create the user's salted and hashed password
const signup = async (password) => {
  const salt = crypto.randomBytes(8).toString("hex");
  const hashed = await scrypt(password, salt, 64);
  const record = {
    password: hashed.toString("hex") + "." + salt,
  };

  return record;
};

//Un-hash the stored user password and compare with the provided password to sign in
const signIn = async (storedPW, providedPW) => {
  const [hash, salt] = storedPW.split(".");

  const providedPWHashed = await scrypt(providedPW, salt, 64);

  return hash === providedPWHashed.toString("hex");
};

module.exports = { signup, signIn };
