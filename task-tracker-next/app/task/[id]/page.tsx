
import { Todo } from "@/types/types";
import React, { FC } from "react";
import styles from "./task.module.css";
import TaskDetails from "@/components/TaskDetails/TaskDetails";
import { notFound } from "next/navigation";
/*
- Mark the dynamic /task/[id] page as a client component, and include a client-side feature (e.g., a button to copy the task’s title to the clipboard using the Clipboard API).
- Fetches and displays the specific task’s details (title, completion status, and ID) from the same API based on the ID in the URL.
- Includes an Image component to visually enhance the page (e.g., a task-related image).
- On the detail page, add a "Back to Tasks" link to return to the homepage.
*/
interface TaskDetailsProps {
  params: Promise<{ id: string }>;
}

const todosAPILink = process.env.NEXT_PUBLIC_TODOS_API_LINK;

const TaskDetailsPage: FC<TaskDetailsProps> = async ({ params }) => {
  const { id } = await params;
  const response = await fetch(`${todosAPILink}/${id}`);
  if(response.status === 404) {
    notFound();
  }
  
  if(!response.ok) {
    ///
  }

  const todo: Todo = await response.json();


  return (
    <TaskDetails todo={todo} />
  );
};

export default TaskDetailsPage;
