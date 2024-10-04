import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TasksRepository } from "./tasks.repository";
import { AuthModule } from "../auth/auth.module";


@Module({
  imports: [
    TypeOrmModule.forFeature([TasksRepository]),
    AuthModule
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}