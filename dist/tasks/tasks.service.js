"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const tasks_repository_1 = require("./tasks.repository");
const typeorm_1 = require("@nestjs/typeorm");
let TasksService = class TasksService {
    constructor(_tasksRepositiory) {
        this._tasksRepositiory = _tasksRepositiory;
    }
    async getTaskById(id) {
        const record = this._tasksRepositiory.findOne({ where: { id } });
        if (!record) {
            throw new common_1.NotFoundException();
        }
        return record;
    }
    createTask(createTaskDto, user) {
        return this._tasksRepositiory.createTask(createTaskDto, user);
    }
    async deleteTaskById(id) {
        const task = await this._tasksRepositiory.delete(id);
        if (task.affected === 0) {
            throw new common_1.NotFoundException();
        }
    }
    async updateTaskStatus(id, status) {
        const task = await this.getTaskById(id);
        task.status = status;
        await this._tasksRepositiory.save(task);
        return task;
    }
    getTasks(filterDto, user) {
        return this._tasksRepositiory.getTasks(filterDto, user);
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tasks_repository_1.TasksRepository)),
    __metadata("design:paramtypes", [tasks_repository_1.TasksRepository])
], TasksService);
//# sourceMappingURL=tasks.service.js.map