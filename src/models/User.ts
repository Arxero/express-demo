import joi, { ValidationResult } from 'joi';
import { DataEntity } from './DataEntity';
import mongoose from 'mongoose';
import * as jwt from 'jsonwebtoken';
import config from 'config';

export interface User extends DataEntity {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 1024,
  },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
  isAdmin: Boolean
});

// tslint:disable-next-line: only-arrow-functions
userSchema.methods.generateAuthToken = function(data: any) {
  return jwt.sign(data, config.get('jwtPrivateKey') || 'test');
};

export const UserDB = mongoose.model('User', userSchema);

export function validateUser(params: User): ValidationResult<any> {
  const schema = {
    name: joi
      .string()
      .min(3)
      .max(50)
      .required(),
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
