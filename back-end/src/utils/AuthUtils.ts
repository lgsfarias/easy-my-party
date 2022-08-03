import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default class AuthUtils {
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
}
