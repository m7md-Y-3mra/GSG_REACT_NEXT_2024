import styles from "./page.module.css";
import { PRIORITIES, responseTodo, Todo } from "@/types/types";
import TaskItem from "@/components/TaskItem/TaskItem";

const todosAPILink = process.env.NEXT_PUBLIC_TODOS_API_LINK;

export default async function Home() {
  const response = await fetch(`${todosAPILink!}?_limit=5`);
  const todos: responseTodo[] = await response.json();

  const tasksWithPriority: Todo[] = todos.map((todo: responseTodo) => ({
    ...(todo as Omit<Todo, "priority">),
    priority: [...PRIORITIES][todo.id % 3],
  }));

  return (
    <>
      <h1 className={styles.title}>Task Tracker</h1>
      <div className={styles.wrapper}>
        {tasksWithPriority.map((todo) => (
          <TaskItem key={todo.id} todo={todo} />
        ))}
      </div>
    </>
  );
}
