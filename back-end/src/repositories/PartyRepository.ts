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
      include: {
        addresses: true,
      },
    });
  }

  async findByName(
    name: string,
    date: Date,
    userId: number,
  ): Promise<Party | null> {
    return this.prisma.party.findUnique({
      where: {
        name_date_userId: {
          name,
          date: new Date(date),
          userId,
        },
      },
      include: {
        addresses: true,
      },
    });
  }

  async findAll(userId: number): Promise<Party[]> {
    return this.prisma.party.findMany({
      where: {
        userId,
      },
      include: {
        addresses: true,
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
