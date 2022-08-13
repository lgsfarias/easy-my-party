import { Request, Response } from 'express';
import UserService from '@services/UserService';

export default class AuthController {
  private readonly userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async sigup(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const user = await this.userService.create({
      name,
      email,
      password,
    });
    res.status(201).json(user);
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const token = await this.userService.verifyCredentials(email, password);
    res.send({ token });
  }

  static async checkAuth(req: Request, res: Response) {
    const { user } = res.locals;
    res.json({
      message: 'You are authenticated',
      user: {
        id: user.id,
        email: user.email,
      },
    });
  }
}
