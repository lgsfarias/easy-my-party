import GuestRepository, {
  CreateGuestData,
} from '@repositories/GuestRepository';
import { Guest, User } from '@prisma/client';
import GuestUtils from '@utils/GuestUtils';
import AppError from '@utils/AppError';

export default class GuestService {
  private guestRepository: GuestRepository;

  private guestUtils: GuestUtils;

  constructor() {
    this.guestRepository = new GuestRepository();
    this.guestUtils = new GuestUtils();
  }

  async create(data: CreateGuestData, user: User): Promise<Guest> {
    await this.guestUtils.verifyIfPartyIsFromUserOrThrow(data.partyId, user.id);
    await this.guestUtils.verifyIfGuestAlreadyExistsOrThrow(
      data.name,
      data.partyId,
    );
    const guest = await this.guestRepository.create(data);
    return guest;
  }

  async findById(
    id: number,
    partyId: number,
    user: User,
  ): Promise<Guest | null> {
    await this.guestUtils.verifyIfPartyIsFromUserOrThrow(partyId, user.id);
    return this.guestRepository.findById(id);
  }

  async findAll(partyId: number, user: User): Promise<Guest[]> {
    await this.guestUtils.verifyIfPartyIsFromUserOrThrow(partyId, user.id);
    return this.guestRepository.findAll(partyId);
  }

  async update(id: number, data: Partial<CreateGuestData>): Promise<Guest> {
    return this.guestRepository.update(id, data);
  }

  async confirm(token: string): Promise<Guest> {
    const { guestId } = GuestUtils.verifyToken(token) as { guestId: number };
    if (!guestId) {
      throw new AppError('Invalid token', 401);
    }
    console.log(guestId);
    return this.guestRepository.confirm(guestId);
  }

  async delete(id: number): Promise<Guest> {
    return this.guestRepository.delete(id);
  }
}
