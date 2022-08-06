import TaskRepository, { CreateTaskData } from '@repositories/TaskRepository';
import { Task } from '@prisma/client';

export default class TaskService {
  private taskRepository: TaskRepository;

  constructor() {
    this.taskRepository = new TaskRepository();
  }

  async create(data: CreateTaskData): Promise<Task> {
    const task = await this.taskRepository.create(data);
    return task;
  }

  async findById(id: number): Promise<Task | null> {
    return this.taskRepository.findById(id);
  }

  async findAll(partyId: number): Promise<Task[]> {
    return this.taskRepository.findAll(partyId);
  }

  async update(id: number, data: Partial<CreateTaskData>): Promise<Task> {
    return this.taskRepository.update(id, data);
  }

  async finish(id: number): Promise<Task> {
    return this.taskRepository.finish(id);
  }

  async delete(id: number): Promise<Task> {
    return this.taskRepository.delete(id);
  }

  async donePercentage(partyId: number): Promise<number> {
    return this.taskRepository.donePercentage(partyId);
  }
}
