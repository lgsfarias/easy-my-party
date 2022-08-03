import UserRepository, { CreateUserData } from '@repositories/UserRepository';
import AuthUtils from '@utils/AuthUtils';
import AppError from '@utils/AppError';

export default class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(data: CreateUserData) {
    const user = await this.userRepository.create(data);
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

  async verifyIfUserExists(email: string) {
    const user = await this.userRepository.findByEmail(email);
    if (user) {
      throw new AppError('User already exists', 400);
    }
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
    return user;
  }
}
