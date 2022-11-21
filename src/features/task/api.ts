import Task, { TaskId } from './types/Task';

const API_URL = 'https://637792865c4777651221a6af.mockapi.io/todos'

export async function createTask(task: Task): Promise<Task> {
  const res = await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(task),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (res.status >= 400) {
    const { error } = await res.json();
    throw error;
  }

  return res.json();
}

export async function deleteTask(id: TaskId): Promise<void> {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
}

export async function getTasks(): Promise<Task[]> {
  return (await fetch(API_URL)).json();
}
