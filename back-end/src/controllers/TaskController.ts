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
    const partyId = Number(req.params.partyId);
    const { description }: Omit<CreateTaskData, 'userId' | 'partyId'> =
      req.body;
    await this.taskUtils.verifyIfPartyIsFromUserOrThrow(partyId, user.id);
    const task = await this.taskService.create({
      description,
      partyId,
    });
    res.status(201).json(task);
  }

  async getAll(req: Request, res: Response) {
    const { user } = res.locals;
    const partyId = Number(req.params.partyId);
    console.log(req.params);
    console.log(partyId);
    await this.taskUtils.verifyIfPartyIsFromUserOrThrow(partyId, user.id);
    const tasks = await this.taskService.findAll(partyId);
    res.status(200).json(tasks);
  }
}
