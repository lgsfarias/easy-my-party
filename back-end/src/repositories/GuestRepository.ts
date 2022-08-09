import { PrismaClient, Guest } from '@prisma/client';
import prisma from '../config/database';

export type CreateGuestData = Omit<Guest, 'id' | 'createdAt' | 'confirmed'>;

export default class GuestRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  async create(data: CreateGuestData): Promise<Guest> {
    return this.prisma.guest.create({
      data,
    });
  }

  async findById(id: number): Promise<Guest | null> {
    return this.prisma.guest.findUnique({
      where: {
        id,
      },
    });
  }

  async findAll(partyId: number): Promise<Guest[]> {
    return this.prisma.guest.findMany({
      where: {
        partyId,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async update(id: number, data: Partial<CreateGuestData>): Promise<Guest> {
    return this.prisma.guest.update({
      where: {
        id,
      },
      data,
    });
  }

  async confirm(id: number): Promise<Guest> {
    return this.prisma.guest.update({
      where: {
        id,
      },
      data: {
        confirmed: true,
      },
    });
  }

  async delete(id: number): Promise<Guest> {
    return this.prisma.guest.delete({
      where: {
        id,
      },
    });
  }
}
