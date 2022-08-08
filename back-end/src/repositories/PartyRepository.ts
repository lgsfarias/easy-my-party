import { PrismaClient, Party } from '@prisma/client';
import prisma from '../config/database';

export type CreatePartyData = Omit<Party, 'id' | 'createdAt'>;

export default class PartyRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  async create(data: CreatePartyData): Promise<Party> {
    const { date } = data;
    const dateTime = new Date(date);
    return this.prisma.party.create({
      data: {
        ...data,
        date: dateTime,
      },
    });
  }

  async findById(id: number): Promise<Party | null> {
    return this.prisma.party.findUnique({
      where: {
        id,
      },
    });
  }

  async findAll(userId: number): Promise<Party[]> {
    return this.prisma.party.findMany({
      where: {
        userId,
      },
      orderBy: {
        date: 'asc',
      },
    });
  }

  async update(id: number, data: Partial<CreatePartyData>): Promise<Party> {
    return this.prisma.party.update({
      where: {
        id,
      },
      data,
    });
  }
}