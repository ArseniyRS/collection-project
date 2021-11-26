import {Router} from 'express'
import bcrypt from 'bcryptjs'
import {check, validationResult} from "express-validator";
import jwt from 'jsonwebtoken'
import cors from 'cors'
import fileService from '../services/fileService.js'
import File from '../models/File.js'
import User from '../models/User.js'
const router = new Router();

router.post(
  "/sign-up",
  cors(),
  [
    check("email", "Uncorrect email").isEmail(),
    check(
      "password",
      "Password must be longer than 3 and shorter than 12"
    ).isLength({ min: 3, max: 12 }),
  ],
  async (req, res) => {
    try {
      console.log(req.body);
      const error = validationResult(req);
      if (!error.isEmpty())
        return res.status(400).json({ message: "Uncorrect request", error });
      const { username, email, password } = req.body;
      const candidate = await User.findOne({ email });
      if (candidate) {
        return res
          .status(400)
          .json({ message: `User with email: ${email} already exist` });
      }

      const hashPassword = await bcrypt.hash(password, 8);
      const user = new User({ username,  email, password: hashPassword });
      await user.save();
      await fileService.createDir(new File({user: user.id, name: ''}))
      return res.json({ message: "User was created" });
    } catch (error) {
      console.log(error);
      res.send({ message: "Sign up error " + error });
    }
  }
);

router.post("/sign-in", cors(), async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = await User.findOne(email ? { email } : {username});
    if (!user) return res.status(404).json({ message: "User not found" });
    const isPassValid = bcrypt.compareSync(password, user.password);
    if (!isPassValid) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username
      },
    });
  } catch (error) {
    res.send({ message: "Sign in error " + error });
  }
});

export default router
