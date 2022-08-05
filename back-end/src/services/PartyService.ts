import PartyRepository, {
  CreatePartyData,
} from '@repositories/PartyRepository';

export default class PartyService {
  private partyRepository: PartyRepository;

  constructor() {
    this.partyRepository = new PartyRepository();
  }

  async create(data: CreatePartyData) {
    const party = await this.partyRepository.create(data);
    return party;
  }

  async findAll(userId: number) {
    const parties = await this.partyRepository.findAll(userId);
    return parties;
  }

  async findById(id: number) {
    const party = await this.partyRepository.findById(id);
    return party;
  }

  async update(id: number, data: Partial<CreatePartyData>) {
    const party = await this.partyRepository.update(id, data);
    return party;
  }
}
