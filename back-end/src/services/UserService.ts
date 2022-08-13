import UserRepository, { CreateUserData } from '@repositories/UserRepository';
import AuthUtils from '@utils/AuthUtils';
import AppError from '@utils/AppError';

export default class UserService {
  private userRepository: UserRepository;

  private authUtils: AuthUtils;

  constructor() {
    this.userRepository = new UserRepository();
    this.authUtils = new AuthUtils();
  }

  async create(data: CreateUserData) {
    const { name, email, password } = data;
    await this.authUtils.verifyIfUserExists(email);
    const hashedPassword = AuthUtils.encryptPassword(password);
    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    return user;
  }

  async findAll() {
    const users = await this.userRepository.findAll();
    return users;
  }

  async findById(id: number) {
    const user = await this.userRepository.findById(id);
    return user;
  }

  async verifyCredentials(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Email or password invalid', 401);
    }
    const isPasswordValid = AuthUtils.verifyPassword(password, user.password);
    if (!isPasswordValid) {
      throw new AppError('Email or password invalid', 401);
    }
    return AuthUtils.generateToken(user.id);
  }
}
