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

  async verifyIfTaskIsFromPartyOrThrow(
    taskId: number,
    partyId: number,
  ): Promise<boolean> {
    const task = await this.taskRepository.findById(taskId);
    if (!task) {
      throw new AppError('Task not found', 404);
    }
    if (task.partyId !== partyId) {
      throw new AppError('You are not authorized to access this task', 403);
    }
    return true;
  }

  async verifyIfTaskAlreadyExistsOrThrow(
    description: string,
    partyId: number,
  ): Promise<boolean> {
    const task = await this.taskRepository.findByDescription(
      description,
      partyId,
    );
    if (task) {
      throw new AppError('Task already exists', 400);
    }
    return true;
  }
}
