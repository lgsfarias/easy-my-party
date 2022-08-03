import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import UserService from '@services/UserService';
import AppError from '../utils/AppError';

type JwtPayload = {
  userId: number;
};
const verifiTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userService = new UserService();

  const { authorization } = req.headers;
  if (!authorization) {
    throw new AppError('Token not provided', 401);
  }

  const parts = authorization.split(' ');
  if (!(parts.length === 2)) {
    throw new AppError('Invalid authorization header', 401);
  }

  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme)) {
    throw new AppError('Invalid authorization header', 401);
  }

  let userId: number;
  try {
    const secret = String(process.env.JWT_SECRET);
    const decoded = <JwtPayload>jwt.verify(token, secret);
    userId = decoded.userId;
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      throw new AppError('Token expired', 401);
    }
    throw new AppError('Invalid token', 401);
  }

  const user = await userService.findById(userId);
  if (!user) {
    throw new AppError('Invalid token', 401);
  }

  res.locals.user = user;
  next();
};

export default verifiTokenMiddleware;
