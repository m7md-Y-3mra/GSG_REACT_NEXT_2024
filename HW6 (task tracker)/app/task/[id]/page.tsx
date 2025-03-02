import { PRIORITIES, Todo } from "@/types/types";
import React, { FC } from "react";
import TaskDetails from "@/components/TaskDetails/TaskDetails";
import { notFound } from "next/navigation";
interface TaskDetailsProps {
  params: Promise<{ id: string }>;
}

const todosAPILink = process.env.NEXT_PUBLIC_TODOS_API_LINK;

const TaskDetailsPage: FC<TaskDetailsProps> = async ({ params }) => {
  const { id } = await params;
  const response = await fetch(`${todosAPILink}/${id}`);

  if (response.status === 404) {
    notFound();
  }

  const todo: Todo = await response.json();
  const todoWithPriority = { ...todo, priority: [...PRIORITIES][todo.id % 3] };

  return <TaskDetails todo={todoWithPriority} />;
};

export default TaskDetailsPage;
