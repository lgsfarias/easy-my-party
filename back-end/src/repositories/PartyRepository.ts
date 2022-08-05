import { PrismaClient, Party } from '@prisma/client';
import prisma from '../config/database';

export type CreatePartyData = Omit<Party, 'id' | 'createdAt'>;

export default class PartyRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  async create(data: CreatePartyData): Promise<Party> {
    return this.prisma.party.create({
      data,
    });
  }

  async findById(id: number): Promise<Party | null> {
    return this.prisma.party.findUnique({
      where: {
        id,
      },
    });
  }

  async findAll(): Promise<Party[]> {
    return this.prisma.party.findMany();
  }

  async update(id: number, data: Partial<Party>): Promise<Party> {
    return this.prisma.party.update({
      where: {
        id,
      },
      data,
    });
  }
}
