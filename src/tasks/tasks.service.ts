import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { TasksRepository } from "./tasks.repository";
import { Task } from "./task.entity";
import { GetTasksFilterDTO } from "./dto/get-tasks-filter.dto";
import { TaskStatus } from "./task-status.model";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../auth/user.entity";

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(TasksRepository)
    private _tasksRepositiory: TasksRepository){}

  async getTaskById(id: string): Promise<Task> {
    const record = this._tasksRepositiory.findOne({ where: { id } });
    if (!record) {
      throw new NotFoundException();
    }
    return record;
  }

  createTask(createTaskDto: CreateTaskDTO, user: User): Promise<Task> {
    return this._tasksRepositiory.createTask(createTaskDto, user);
  }

  async deleteTaskById(id: string) {
    const task = await this._tasksRepositiory.delete(id);

    if (task.affected === 0) {
      throw new NotFoundException();
    }
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);

    task.status = status;
    await this._tasksRepositiory.save(task);

    return task;
  }

  getTasks(filterDto: GetTasksFilterDTO, user: User): Promise<Task[]> {
    return this._tasksRepositiory.getTasks(filterDto, user);
  }

 /* private tasks: Task[] = [];

  getAllTasks() {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    const found = this.tasks.find(task => task.id === id);

    if (!found) {
      throw new NotFoundException('Task no found');
    }

    return found;
  }

  getTasksWithFilters(filterDTO: GetTasksFilterDTO): Task[] {
    let tasks = this.getAllTasks();
    const { status, search } = filterDTO

    if (status) {
      tasks = tasks.filter(task => task.status === status)
    }

    if (search){
      tasks = tasks.filter(task => task.title === search)
    }

    return tasks;
  }

  createTask(createTaskDTO: CreateTaskDTO): Task {
    const { title, description } = createTaskDTO;
    const task: Task = {
      id: '1',
      title,
      description,
      status: TaskStatus.OPEN,
    }

    this.tasks.push(task);
    return task;
  }

  deleteTaskById(id: string) {
    const found = this.getTaskById(id);
    this.tasks = this.tasks.filter(task => task.id !== found.id);
  }*/
}
