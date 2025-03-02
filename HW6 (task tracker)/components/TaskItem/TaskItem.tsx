import Image from "next/image";
import React, { FC } from "react";
import pendingIcon from '@/public/pending.png';
import completedIcon from '@/public/check-mark.png';
import styles from './TaskItem.module.css';
import { Todo } from "@/types/types";
import Link from "next/link";

interface TaskItemProps {
  todo: Todo
}

const TaskItem:FC<TaskItemProps> = ({todo}) => {
  const icon = todo.completed ? completedIcon : pendingIcon;

  return (
    <Link href={`/task/${todo.id}`}>
    <div className={`${styles.wrapper} ${todo.priority}`}>
      <div>{todo.title}</div>
      <Image src={icon} alt='status task icon' width={25} height={25} />
    </div>
    </Link>
  );
};

export default TaskItem;
