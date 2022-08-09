import { Request, Response } from 'express';
import GuestService from '@services/GuestService';
import { CreateGuestData } from '@repositories/GuestRepository';
import GuestUtils from '@utils/GuestUtils';

export default class GuestController {
  private readonly guestService: GuestService;

  private readonly guestUtils: GuestUtils;

  constructor() {
    this.guestService = new GuestService();
    this.guestUtils = new GuestUtils();
  }

  async create(req: Request, res: Response) {
    const { user } = res.locals;
    const partyId = Number(req.params.partyId);
    const {
      name,
      dependents,
      email,
    }: Omit<CreateGuestData, 'userId' | 'partyId'> = req.body;

    const party = await this.guestUtils.verifyIfPartyIsFromUserOrThrow(
      partyId,
      user.id,
    );
    const guest = await this.guestService.create(
      {
        name,
        dependents,
        email,
        partyId,
      },
      user,
    );
    await GuestUtils.sendEmailToGuest(party, guest);

    res.status(201).json(guest);
  }

  async getAll(req: Request, res: Response) {
    const { user } = res.locals;
    const partyId = Number(req.params.partyId);

    const guests = await this.guestService.findAll(partyId, user);
    res.status(200).json(guests);
  }

  async getById(req: Request, res: Response) {
    const { user } = res.locals;
    const partyId = Number(req.params.partyId);
    const guestId = Number(req.params.guestId);

    const guest = await this.guestService.findById(guestId, partyId, user);
    res.status(200).json(guest);
  }

  async confirm(req: Request, res: Response) {
    const token = req.query.token as string;
    const guestId = Number(req.params.guestId);

    await this.guestService.confirm(token, guestId);
    res.status(200).json({ message: 'Guest confirmed' });
  }
}
