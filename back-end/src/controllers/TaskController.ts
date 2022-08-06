import { Request, Response } from 'express';
import TaskService from '@services/TaskService';
import { CreateTaskData } from '@repositories/TaskRepository';
import TaskUtils from '@utils/TaskUtils';

export default class TaskController {
  private readonly taskService: TaskService;

  private readonly taskUtils: TaskUtils;

  constructor() {
    this.taskService = new TaskService();
    this.taskUtils = new TaskUtils();
  }

  async create(req: Request, res: Response) {
    const { user } = res.locals;
    const { description, partyId }: Omit<CreateTaskData, 'userId'> = req.body;
    await this.taskUtils.verifyIfPartyIsFromUserOrThrow(partyId, user.id);
    const task = await this.taskService.create({
      description,
      partyId,
    });
    res.status(201).json(task);
  }
}
