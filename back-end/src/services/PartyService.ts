import { Party } from '@prisma/client';
import PartyRepository, {
  CreatePartyData,
} from '@repositories/PartyRepository';

export default class PartyService {
  private partyRepository: PartyRepository;

  constructor() {
    this.partyRepository = new PartyRepository();
  }

  async create(data: CreatePartyData): Promise<Party> {
    const party = await this.partyRepository.create(data);
    return party;
  }

  async findAll(userId: number): Promise<Party[]> {
    const parties = await this.partyRepository.findAll(userId);
    return parties;
  }

  async findById(id: number): Promise<Party | null> {
    const party = await this.partyRepository.findById(id);
    return party;
  }

  async update(id: number, data: Partial<CreatePartyData>): Promise<Party> {
    const party = await this.partyRepository.update(id, data);
    return party;
  }
}
