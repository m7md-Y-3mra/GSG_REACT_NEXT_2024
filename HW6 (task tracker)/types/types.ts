export const PRIORITIES = ['high', 'medium', 'low'] as const;

export type PriorityType = typeof PRIORITIES[number];
export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  priority: PriorityType
}

export type responseTodo = Omit<Todo, 'priority'>;
