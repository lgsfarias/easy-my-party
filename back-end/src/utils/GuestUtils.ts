import { Guest } from '@prisma/client';
import GuestRepository from '@repositories/GuestRepository';
import PartyRepository, {
  PartyWithAddress,
} from '@repositories/PartyRepository';
import sgMail from '@sendgrid/mail';
import jwt from 'jsonwebtoken';
import AppError from './AppError';

export default class GuestUtils {
  private guestRepository: GuestRepository;

  private partyRepository: PartyRepository;

  constructor() {
    this.guestRepository = new GuestRepository();
    this.partyRepository = new PartyRepository();
  }

  async verifyIfPartyIsFromUserOrThrow(
    partyId: number,
    userId: number,
  ): Promise<PartyWithAddress> {
    const party = await this.partyRepository.findById(partyId);
    if (!party) {
      throw new AppError('Party not found', 404);
    }
    if (party.userId !== userId) {
      throw new AppError('You are not authorized to access this party', 403);
    }
    return party;
  }

  async verifyIfGuestIsFromPartyOrThrow(
    guestId: number,
    partyId: number,
  ): Promise<boolean> {
    const guest = await this.guestRepository.findById(guestId);
    if (!guest) {
      throw new AppError('Guest not found', 404);
    }
    if (guest.partyId !== partyId) {
      throw new AppError('You are not authorized to access this guest', 403);
    }
    return true;
  }

  async verifyIfGuestAlreadyExistsOrThrow(
    email: string,
    partyId: number,
  ): Promise<boolean> {
    const guest = await this.guestRepository.findByEmail(email, partyId);
    if (guest) {
      throw new AppError('Guest already exists', 400);
    }
    return true;
  }

  static generateToken(id: number) {
    const secret = String(process.env.JWT_SECRET);
    const token = jwt.sign({ guestId: id }, secret);
    return token;
  }

  static verifyToken(token: string) {
    const secret = String(process.env.JWT_SECRET);
    return jwt.verify(token, secret);
  }

  static async sendEmailToGuest(party: PartyWithAddress, guest: Guest) {
    const token = GuestUtils.generateToken(guest.id);
    const date = new Date(party.date);

    const apiKey = String(process.env.SENDGRID_API_KEY);
    sgMail.setApiKey(apiKey);
    const msg = {
      to: guest.email,
      from: String(process.env.SENDGRID_FROM),
      templateId: String(process.env.SENDGRID_TEMPLATE_ID),
      dynamic_template_data: {
        party: {
          name: party.name,
          datetime: {
            date: date.toLocaleDateString('pt-BR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            }),
            time: date.toLocaleTimeString('pt-BR', {
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
            }),
          },
          adress: {
            street: party.addresses[0].street,
            city: party.addresses[0].city,
            state: party.addresses[0].state,
          },
        },
        confirmationlink: `${String(
          process.env.FRONTEND_URL,
        )}/confirm?token=${token}`,
      },
    };

    try {
      await sgMail.send(msg);
    } catch (error: any) {
      console.log(error.response.body.errors);
    }
  }
}
