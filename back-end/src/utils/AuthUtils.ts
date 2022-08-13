import UserRepository from '@repositories/UserRepository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import AppError from './AppError';

export default class AuthUtils {
  readonly userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  static encryptPassword(password: string) {
    const cost = Number(process.env.HASH_COST);
    const hashedPassword = bcrypt.hashSync(password, cost);
    return hashedPassword;
  }

  static verifyPassword(password: string, hashedPassword: string) {
    return bcrypt.compareSync(password, hashedPassword);
  }

  static generateToken(id: number) {
    const secret = String(process.env.JWT_SECRET);
    const token = jwt.sign({ userId: id }, secret, {
      expiresIn: '1h',
    });
    return token;
  }

  async verifyIfUserExists(email: string) {
    const user = await this.userRepository.findByEmail(email);
    if (user) {
      throw new AppError('User already exists', 400);
    }
  }
}
