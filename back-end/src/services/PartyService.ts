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

  async findAll() {
    const parties = await this.partyRepository.findAll();
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
