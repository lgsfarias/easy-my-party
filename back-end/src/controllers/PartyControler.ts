import { Request, Response } from 'express';
import PartyService from '@services/PartyService';
import { CreatePartyData } from '@repositories/PartyRepository';

export default class PartyController {
  private readonly partyService: PartyService;

  constructor() {
    this.partyService = new PartyService();
  }

  async create(req: Request, res: Response) {
    const { user } = res.locals;
    const { name, date }: Omit<CreatePartyData, 'userId'> = req.body;
    const party = await this.partyService.create({
      name,
      date,
      userId: user.id,
    });
    res.status(201).json(party);
  }

  async getAll(req: Request, res: Response) {
    const { user } = res.locals;
    const parties = await this.partyService.findAll(user.id);
    res.json(parties);
  }

  async getById(req: Request, res: Response) {
    const { user } = res.locals;
    const id = +req.params.id;
    const party = await this.partyService.findById(id);
    if (party?.userId !== user.id) {
      res.status(403).json({
        message: 'You are not authorized to access this party',
      });
    }
    res.json(party);
  }

  async update(req: Request, res: Response) {
    const { user } = res.locals;
    const id = +req.params.id;
    const dataToUpdate: Partial<CreatePartyData> = req.body;
    const party = await this.partyService.update(id, dataToUpdate);
    if (party?.userId !== user.id) {
      res.status(403).json({
        message: 'You are not authorized to access this party',
      });
    }
    res.json(party);
  }
}
