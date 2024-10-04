import { EntityRepository, Repository } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.model";
import { Injectable } from "@nestjs/common";
import { GetTasksFilterDTO } from "./dto/get-tasks-filter.dto";
import { User } from "../auth/user.entity";

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {

  async createTask(createTaskDto: CreateTaskDTO, user: User): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user
    });

    await this.save(task);
    return task;
  }

  async getTasks(filterDTO: GetTasksFilterDTO, user: User): Promise<Task[]> {
    const { status, search } = filterDTO;
    const query = this.createQueryBuilder('task');

    query.where({user})

    if (status) {
      query.andWhere('task.status = :status', {status})
    }

    if (search) {
      query.andWhere('task.title LIKE :search', {search: `%${search}%`})
    }

    const tasks = await query.getMany();
    return tasks;
  }
}