import express, { Request, Response, Router } from 'express';
import { UserDB, User } from '../models';
import * as _ from 'lodash';
import bcrypt from 'bcrypt';
import joi, { ValidationResult } from 'joi';
import * as jwt from 'jsonwebtoken';
import config from 'config';
export const router: Router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const userInput = req.body as User;
  const { error } = validateUser(userInput);
  if (error) return res.status(400).send(error.details[0].message);

  const foundUser = await UserDB.findOne({ email: userInput.email });
  if (!foundUser) return res.status(400).send('Invalid email or password');

  const validaPassword = await bcrypt.compare(userInput.password, foundUser.get('password'));
  if (!validaPassword) return res.status(400).send('Invalid email or password');

  const token = foundUser.schema.methods.generateAuthToken(_.pick(foundUser, ['isAdmin', 'id']));
  // const token = jwt.sign({ _id:  _.pick(foundUser, ['id'])}, config.get('jwtPrivateKey') || 'test');
  res.send(token);
});

export function validateUser(params: User): ValidationResult<any> {
  const schema = {
    email: joi
      .string()
      .min(3)
      .max(50)
      .required()
      .email(),
    password: joi
      .string()
      .min(3)
      .max(50)
      .required(),
  };
  return joi.validate(params, schema);
}
