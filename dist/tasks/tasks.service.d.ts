import { CreateTaskDTO } from "./dto/create-task.dto";
import { TasksRepository } from "./tasks.repository";
import { Task } from "./task.entity";
import { GetTasksFilterDTO } from "./dto/get-tasks-filter.dto";
import { TaskStatus } from "./task-status.model";
import { User } from "../auth/user.entity";
export declare class TasksService {
    private _tasksRepositiory;
    constructor(_tasksRepositiory: TasksRepository);
    getTaskById(id: string): Promise<Task>;
    createTask(createTaskDto: CreateTaskDTO, user: User): Promise<Task>;
    deleteTaskById(id: string): Promise<void>;
    updateTaskStatus(id: string, status: TaskStatus): Promise<Task>;
    getTasks(filterDto: GetTasksFilterDTO, user: User): Promise<Task[]>;
}
