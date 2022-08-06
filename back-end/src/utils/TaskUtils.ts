import TaskRepository from '@repositories/TaskRepository';
import PartyRepository from '@repositories/PartyRepository';
import AppError from './AppError';

export default class TaskUtils {
  private taskRepository: TaskRepository;

  private partyRepository: PartyRepository;

  constructor() {
    this.taskRepository = new TaskRepository();
    this.partyRepository = new PartyRepository();
  }

  async verifyIfPartyIsFromUserOrThrow(
    partyId: number,
    userId: number,
  ): Promise<boolean> {
    const party = await this.partyRepository.findById(partyId);
    if (!party) {
      throw new AppError('Party not found', 404);
    }
    if (party.userId !== userId) {
      throw new AppError('You are not authorized to access this party', 403);
    }
    return true;
  }
}
