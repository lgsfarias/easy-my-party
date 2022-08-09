import { PrismaClient, Task } from '@prisma/client';
import AppError from '@utils/AppError';
import prisma from '../config/database';

export type CreateTaskData = Omit<Task, 'id' | 'createdAt' | 'done'>;

export default class TaskRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  async create(data: CreateTaskData): Promise<Task> {
    return this.prisma.task.create({
      data,
    });
  }

  async findById(id: number): Promise<Task | null> {
    return this.prisma.task.findUnique({
      where: {
        id,
      },
    });
  }

  async findAll(partyId: number): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: {
        partyId,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async update(id: number, data: Partial<CreateTaskData>): Promise<Task> {
    return this.prisma.task.update({
      where: {
        id,
      },
      data,
    });
  }

  async finish(id: number): Promise<Task> {
    // toggle done
    const task = await this.prisma.task.findUnique({
      where: {
        id,
      },
    });
    if (!task) {
      throw new AppError('Task not found', 404);
    }
    const data = {
      done: !task.done,
    };
    return this.prisma.task.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: number): Promise<Task> {
    return this.prisma.task.delete({
      where: {
        id,
      },
    });
  }

  async donePercentage(partyId: number): Promise<number> {
    const done = await this.prisma.task.count({
      where: {
        partyId,
        done: true,
      },
    });
    const total = await this.prisma.task.count({
      where: {
        partyId,
      },
    });
    if (total === 0) {
      return 100;
    }
    return Math.round((done / total) * 100);
  }

  async findByDescription(
    description: string,
    partyId: number,
  ): Promise<Task | null> {
    return this.prisma.task.findUnique({
      where: {
        description_partyId: {
          description,
          partyId,
        },
      },
    });
  }
}
