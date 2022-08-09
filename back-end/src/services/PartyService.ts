import { Party } from '@prisma/client';
import PartyRepository, {
  CreatePartyData,
} from '@repositories/PartyRepository';
import AppError from '@utils/AppError';

export default class PartyService {
  private partyRepository: PartyRepository;

  constructor() {
    this.partyRepository = new PartyRepository();
  }

  async create(data: CreatePartyData): Promise<Party> {
    return this.partyRepository.create(data);
  }

  async findAll(userId: number): Promise<Party[]> {
    return this.partyRepository.findAll(userId);
  }

  async findById(id: number): Promise<Party | null> {
    return this.partyRepository.findById(id);
  }

  async update(id: number, data: Partial<CreatePartyData>): Promise<Party> {
    return this.partyRepository.update(id, data);
  }

  async verifyIfPartyAlreadyExists(
    name: string,
    date: Date,
    userId: number,
  ): Promise<void> {
    const party = await this.partyRepository.findByName(name, date, userId);
    if (party) {
      throw new AppError('Party already exists', 400);
    }
  }
}
