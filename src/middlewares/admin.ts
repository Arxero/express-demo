import express, { Request, Response, Router } from 'express';
import * as jwt from 'jsonwebtoken';
import config from 'config';
import { RequestEx } from './auth';

// tslint:disable-next-line: only-arrow-functions
module.exports = function (req: RequestEx, res: Response, next: any) {
  if (!req.user.isAdmin) return res.status(403).send('Access denied');
  next();
};
