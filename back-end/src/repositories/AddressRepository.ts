import { PrismaClient, Address } from '@prisma/client';
import prisma from '../config/database';

export type CreateAddressData = Omit<Address, 'id' | 'createdAt'>;

export default class AddressRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  async create(data: CreateAddressData): Promise<Address> {
    return this.prisma.address.create({
      data,
    });
  }

  async findById(id: number): Promise<Address | null> {
    return this.prisma.address.findUnique({
      where: {
        id,
      },
    });
  }
}
