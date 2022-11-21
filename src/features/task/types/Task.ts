export default interface Task {
  id?: number;
  type: string;
  description: string;
  timeToDo: number;
}

export type TaskId = Task['id'];