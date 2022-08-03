import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default class AuthUtils {
  static encryptPassword(password: string) {
    const cost = +process.env.HASH_COST;
    const hashedPassword = bcrypt.hashSync(password, cost);
    return hashedPassword;
  }

  static verifyPassword(password: string, hashedPassword: string) {
    return bcrypt.compareSync(password, hashedPassword);
  }

  static generateToken(id: number) {
    const token = jwt.sign({ userId: id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    return token;
  }
}
