import { PrismaClient, User } from '@prisma/client';
import prisma from '../config/database';

export type CreateUserData = Omit<User, 'id' | 'createdAt'>;

export default class UserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  async create(data: CreateUserData): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async findById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }
}
