import _ from "lodash";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Joi from "@hapi/joi";
import knexfile from "~/server/knexfile";
import jwt from "jsonwebtoken";
import { getKnex } from "~/server/util";
const db = getKnex(knexfile.connection)("Users");
dotenv.config({
  silent: true,
});
const saltRounds = 10;

const UserCreateSchema = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string().required(),
  gender: Joi.string().required(),
});

const UserLoginSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string().required(),
});

class UserService {
  validateUser = async (req, res, next) => {
    const body = JSON.stringify(req.body);
    if (
      body &&
      !body.includes("createUserAccount") &&
      body.includes("createUser")
    ) {
      return false;
    }
  };

  saveUser = async (userData) => {
    const salt = await bcrypt.genSalt(saltRounds);
    const generateHash = await bcrypt.hash(userData.password, salt);
    userData.password = generateHash;
    const savedData = await db.returning(["id", "password"]).insert(userData);
  };

  checkValidData = (data) => {
    const valid = UserCreateSchema.validate(data);
    if (valid.error) {
      return { valid: false, error: valid.error };
    }

    return { valid: true };
  };

  getUserFields = (userRequest, fields = []) => {
    const defineUsers = _.pick(userRequest, fields);
    return defineUsers;
  };

  validateData = async (data, fields) => {
    const defineUsers = this.getUserFields(data, fields);
    const response = this.checkValidData(defineUsers);
    if (response.valid) {
      this.saveUser(defineUsers);
    }
  };

  signToken = (id) => {
    const token = jwt.sign({ id }, process.env.JWT_TOKEN || "secret", {
      expiresIn: "2h", // expires 2 hours
    });

    return token;
  };

  createUser = async (_query, args, _context) => {
    const userFields = [
      "password",
      "firstName",
      "lastName",
      "email",
      "gender",
      "phoneNumber",
    ];
    const validResponse = this.validateData(args.input, userFields);
  };

  logUserIn = async (_query, args, _context) => {
    const { email } = args.input;
    const { password } = args.input;

    const valid = UserLoginSchema.validate({ email, password });
    if (valid.error) {
    }

    const response = await db
      .where({
        email,
      })
      .select(["id", "password"]);

    if (response && response[0]) {
      const { password : retrievedPassword, id } = response[0];
      const validPassword = await bcrypt.compare(password, retrievedPassword);
      if (validPassword) {
        const token = this.signToken(id);

        return {
          status: "ok",
          token,
        };
      }
    }

    return null;
  };
}

export default new UserService();
