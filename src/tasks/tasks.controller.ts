import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from "./dto/create-task.dto";
import { GetTasksFilterDTO } from "./dto/get-tasks-filter.dto";
import { Task } from "./task.entity";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "../auth/get-user.decorator";
import { User } from "../auth/user.entity";

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDTO,
    @GetUser() user: User
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string) {
    this.tasksService.deleteTaskById(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(@Param('id') id: string, @Body() updateTaskStatusDTO): Promise<Task> {
    const { status } = updateTaskStatusDTO;
    return this.tasksService.updateTaskStatus(id, status);
  }

  @Get()
  getTasks(
    @Query() filterDto: GetTasksFilterDTO,
    @GetUser() user: User
  ): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto, user);
  }

/*@Get()
getTasks(@Query() filterDto: GetTasksFilterDTO): Task[] {
  if (Object.keys(filterDto).length) {
    return this.tasksService.getTasksWithFilters(filterDto);
  } else {
    return this.tasksService.getAllTasks();
  }
}

@Get('/:id')
getTaskById(@Param('id') id: string): Task {
  return this.tasksService.getTaskById(id);
}

@Post()
createTask(@Body() createTaskDTO: CreateTaskDTO): Task {
  return this.tasksService.createTask(createTaskDTO);
}

@Delete('/:id')
deleteTaskById(@Param('id') id: string) {
  this.tasksService.deleteTaskById(id);
}*/
}
