import express, { Request, Response, Router } from 'express';
import * as jwt from 'jsonwebtoken';
import config from 'config';
import { User } from '../models';

export interface RequestEx extends Request {
  user: User;
}

// tslint:disable-next-line: only-arrow-functions
module.exports = function (req: RequestEx, res: Response, next: any) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Unauthorized');

  try {
    const decoded = jwt.verify(token!, config.get('jwtPrivateKey') || 'test');
    req.user = decoded as User;
    next();
  } catch (error) {
    res.status(400).send('Invalid token.');
  }
};
