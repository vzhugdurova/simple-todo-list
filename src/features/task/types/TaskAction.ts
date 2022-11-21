import Task, { TaskId } from './Task';

export type FilterType = "DESC" | "ASC";

type TasksAction =
  | { type: 'TASK_ADDED'; payload: Task }
  | { type: 'TASKS_LOADED'; payload: Task[] }
  | { type: 'TASKS_SORTED_BY_TIME'; payload: FilterType }
  | { type: 'TASK_DELETED'; payload: TaskId }
  | { type: 'TASK_UPDATED'; payload: Task }
  | { type: 'SET_EDIT_MOOD'; payload: Task | null };

export default TasksAction;
