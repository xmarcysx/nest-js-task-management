"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksRepository = void 0;
const typeorm_1 = require("typeorm");
const task_entity_1 = require("./task.entity");
const task_status_model_1 = require("./task-status.model");
let TasksRepository = class TasksRepository extends typeorm_1.Repository {
    async createTask(createTaskDto, user) {
        const { title, description } = createTaskDto;
        const task = this.create({
            title,
            description,
            status: task_status_model_1.TaskStatus.OPEN,
            user
        });
        await this.save(task);
        return task;
    }
    async getTasks(filterDTO, user) {
        const { status, search } = filterDTO;
        const query = this.createQueryBuilder('task');
        query.where({ user });
        if (status) {
            query.andWhere('task.status = :status', { status });
        }
        if (search) {
            query.andWhere('task.title LIKE :search', { search: `%${search}%` });
        }
        const tasks = await query.getMany();
        return tasks;
    }
};
exports.TasksRepository = TasksRepository;
exports.TasksRepository = TasksRepository = __decorate([
    (0, typeorm_1.EntityRepository)(task_entity_1.Task)
], TasksRepository);
//# sourceMappingURL=tasks.repository.js.map