import express, { Request, Response, Router } from 'express';
import { UserDB, validateUser, User } from '../models';
import * as _ from 'lodash';
import bcrypt from 'bcrypt';
import { RequestEx } from '../middlewares/auth';
const auth = require('../middlewares/auth');
export const router: Router = express.Router();

router.get('/me', auth, async (req: any, res: Response) => {
  const user = await UserDB.findById(req.user.id).select('-password');
  res.send(user);
});

router.post('/', async (req: Request, res: Response) => {
  const userInput = req.body as User;
  const { error } = validateUser(userInput);
  if (error) return res.status(400).send(error.details[0].message);

  const foundUser = await UserDB.findOne({ email: userInput.email });
  if (foundUser) return res.status(400).send('User already exist');

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(userInput.password, salt);
  userInput.password = hashed;
  const user = new UserDB(userInput);

  await user.save();
  const token = user.schema.methods.generateAuthToken({ id: user.id });
  res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
});
