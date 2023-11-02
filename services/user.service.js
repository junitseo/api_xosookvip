const config = require("../config/auth.config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
// const db = require('_helpers/db');
const User = require("../models/user.js");
const RefreshToken = require("../models/refreshToken.js");
const Role = require("../models/role.js");
const mongoose = require("mongoose");
module.exports = {
  authenticate,
  refreshToken,
  revokeToken,
  getAll,
  getById,
  getRefreshTokens,
  getByName,
  createUser,
  removeUser,
  search,
  editUser,
  editProfile,
  editAvatar,
};

function isValidId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

async function editAvatar(id, image) {
  try {
    const result = await User.findByIdAndUpdate(id, {
      avatar: image,
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function createUser({ username, password, firstName, lastName, role }) {
  const userQuery = await User.findOne({ username });
  const roleQuery = await Role.findOne({ role });
  if (!userQuery && roleQuery) {
    let user = new User({
      firstName: firstName,
      lastName: lastName,
      username: username,
      passwordHash: bcrypt.hashSync(password, 10),
      role: role,
    });
    await user.save();
    return user;
  } else {
    return null;
  }
}
async function editUser({ id, username, password, firstName, lastName, role }) {
  const roleQuery = await Role.findOne({ role });
  var userQuery = await getById(id);
  if (roleQuery && userQuery) {
    var update = {
      username: username,
      firstName: firstName,
      lastName: lastName,
      role: role,
      passwordHash:
        password && password.length
          ? bcrypt.hashSync(password, 10)
          : userQuery.passwordHash,
    };
    try {
      let result = await User.findByIdAndUpdate(id, update, { new: true });
      return result;
    } catch (error) {
      return error.message;
    }
  } else {
    return null;
  }
}

async function removeUser(id) {
  if (!isValidId(id)) return { message: "User not found" };
  const user = await User.findByIdAndRemove(id);
  const refreshToken = await RefreshToken.deleteMany({ user: id });
  return user;
}

async function authenticate({ username, password, ipAddress }) {
  const user = await User.findOne({ username });

  if (!user || bcrypt.compareSync(password, user.passwordHash) === false) {
    return { message: "Username or password is incorrect" };
  }

  // authentication successful so generate jwt and refresh tokens
  const jwtToken = generateJwtToken(user);
  const refreshToken = generateRefreshToken(user, ipAddress);

  // save refresh token
  await refreshToken.save();

  // return basic details and tokens
  return {
    ...basicDetails(user),
    jwtToken,
    refreshToken: refreshToken.token,
  };
}

async function refreshToken({ token, ipAddress }) {
  const refreshToken = await getRefreshToken(token);
  const { user } = refreshToken;

  // replace old refresh token with a new one and save
  const newRefreshToken = generateRefreshToken(user, ipAddress);
  refreshToken.revoked = Date.now();
  refreshToken.revokedByIp = ipAddress;
  refreshToken.replacedByToken = newRefreshToken.token;
  await refreshToken.save();
  await newRefreshToken.save();

  // generate new jwt
  const jwtToken = generateJwtToken(user);

  // return basic details and tokens
  return {
    ...basicDetails(user),
    jwtToken,
    refreshToken: newRefreshToken.token,
  };
}

async function editProfile(username, firstname, lastname, id) {
  try {
    const user = await User.findByIdAndUpdate(id, {
      username: username,
      firstName: firstname,
      lastName: lastname,
    });
    return user;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function revokeToken({ token, ipAddress }) {
  const refreshToken = await getRefreshToken(token);

  // revoke token and save
  refreshToken.revoked = Date.now();
  refreshToken.revokedByIp = ipAddress;
  await refreshToken.save();
}

async function search(search) {
  if (search) {
    var query = await User.find({
      $or: [
        { username: { $regex: search, $options: "i" } },
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
      ],
    }).sort({ updatedAt: -1 });
    return query.map((x) => basicDetails(x));
  } else {
    var query = await User.find({});
    return query.map((x) => basicDetails(x));
  }
}

async function getAll() {
  const users = await User.find().sort({ updatedAt: -1 });
  return users.map((x) => basicDetails(x));
}

async function getByName(username) {
  const user = await User.findOne({ username: username }).sort({
    updatedAt: -1,
  });
  if (!user) return { message: "User not found" };
  return user;
}

async function getById(id) {
  const user = await getUser(id);
  if (user) {
    return basicDetails(user);
  }
  return user;
}

async function getRefreshTokens(userId) {
  // check that user exists
  await getUser(userId);

  // return refresh tokens for user
  const refreshTokens = await RefreshToken.find({ user: userId });
  return refreshTokens;
}

// helper functions

async function getUser(id) {
  if (!isValidId(id)) return { message: "User not found" };
  const user = await User.findById(id);
  if (!user) return { message: "User not found" };
  return user;
}

async function getRefreshToken(token) {
  const refreshToken = await RefreshToken.findOne({ token }).populate("user");
  if (!refreshToken || !refreshToken.isActive)
    return { message: "Invalid token" };
  return refreshToken;
}

function generateJwtToken(user) {
  // create a jwt token containing the user id that expires in 15 minutes (mới set lại 360 phút)
  return jwt.sign({ sub: user.id, id: user.id }, config.secret, {
    expiresIn: "360m",
  });
}

function generateRefreshToken(user, ipAddress) {
  // create a refresh token that expires in 7 days
  console.log(user);
  return new RefreshToken({
    user: user.id,
    token: randomTokenString(),
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    createdByIp: ipAddress,
  });
}

function randomTokenString() {
  return crypto.randomBytes(40).toString("hex");
}

function basicDetails(user) {
  const { id, firstName, lastName, username, role, avatar } = user;
  return { id, firstName, lastName, username, role, avatar };
}
