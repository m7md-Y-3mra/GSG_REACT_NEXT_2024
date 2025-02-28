import styles from "./page.module.css";
import { Todo } from "@/types/types";
import TaskItem from "@/components/TaskItem/TaskItem";
import Link from "next/link";
/*
- list of fetched tasks (5)
- On the homepage, add a Link component to each task that directs to its detail page (e.g., /task/1, /task/2, etc.).
*/
const todosAPILink = process.env.NEXT_PUBLIC_TODOS_API_LINK;

export default async function Home() {
  const data = await fetch(todosAPILink!);
  const todos: Todo[] = await data.json();

  return (
    <>
      <h1 className={styles.title}>Task Tracker</h1>
      <div className={styles.wrapper}>
        {todos.slice(0, 5).map((todo) => (
          <Link key={todo.id} href={`/task/${todo.id}`}>
            <TaskItem
              key={todo.id}
              title={todo.title}
              completed={todo.completed}
            />
          </Link>
        ))}
      </div>
    </>
  );
}
