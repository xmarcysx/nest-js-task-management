import { TaskStatus } from "../task-status.model";

export class GetTasksFilterDTO {
  status?: TaskStatus;
  search?: string;
}