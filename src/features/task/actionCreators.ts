import { FilterType } from './types/TaskAction';
import Task, { TaskId } from './types/Task';
import TasksAction from './types/TaskAction';


export const tasksLoaded = (tasks: Task[]): TasksAction => ({
  type: 'TASKS_LOADED',
  payload: tasks,
});

export const tasksSortedByTime = (filter: FilterType): TasksAction => ({
  type: 'TASKS_SORTED_BY_TIME',
  payload: filter,
});

export const taskAdded = (task: Task): TasksAction => ({
  type: 'TASK_ADDED',
  payload: task,
});

export const taskDeleted = (taskId: TaskId): TasksAction => ({
  type: 'TASK_DELETED',
  payload: taskId,
});

export const taskUpdated = (task: Task): TasksAction => ({
  type: 'TASK_UPDATED',
  payload: task,
});