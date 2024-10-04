import { TasksService } from './tasks.service';
import { CreateTaskDTO } from "./dto/create-task.dto";
import { GetTasksFilterDTO } from "./dto/get-tasks-filter.dto";
import { Task } from "./task.entity";
import { User } from "../auth/user.entity";
export declare class TasksController {
    private tasksService;
    constructor(tasksService: TasksService);
    getTaskById(id: string): Promise<Task>;
    createTask(createTaskDto: CreateTaskDTO, user: User): Promise<Task>;
    deleteTaskById(id: string): void;
    updateTaskStatus(id: string, updateTaskStatusDTO: any): Promise<Task>;
    getTasks(filterDto: GetTasksFilterDTO, user: User): Promise<Task[]>;
}
