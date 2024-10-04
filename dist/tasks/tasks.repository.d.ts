import { Repository } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { GetTasksFilterDTO } from "./dto/get-tasks-filter.dto";
import { User } from "../auth/user.entity";
export declare class TasksRepository extends Repository<Task> {
    createTask(createTaskDto: CreateTaskDTO, user: User): Promise<Task>;
    getTasks(filterDTO: GetTasksFilterDTO, user: User): Promise<Task[]>;
}
