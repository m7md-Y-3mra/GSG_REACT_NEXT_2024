'use client'
import React, { FC, useRef } from "react";
import styles from "./TaskDetails.module.css";
import Image from "next/image";
import pendingIcon from "@/public/pending.png";
import completedIcon from "@/public/check-mark.png";
import Link from "next/link";
import { Todo } from "@/types/types";

interface TaskDetailsProps {
  todo: Todo;
}
const TaskDetails: FC<TaskDetailsProps> = ({ todo }) => {
  const clipboardRef = useRef<Clipboard>(navigator.clipboard);

  const handleCopyTitle = async () => {
    if (!todo?.title) return;

    try {
      await clipboardRef.current.writeText(todo.title);
      console.log(`"${todo?.title}" was copied to your clipboard.`);
    } catch (err) {
      console.error(`Error copying text to clipboard: ${err}`);
    }
  };

  return (
    <div>
      <div className={styles.wrapper}>
        <Image
          src={todo?.completed ? completedIcon : pendingIcon}
          alt={todo?.completed ? "Completed task" : "Pending task"}
          width={150}
          height={150}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div>{todo?.id}</div>
        <div onClick={handleCopyTitle}>{todo?.title}</div>
        <div>{todo?.completed ? "completed" : "pending"}</div>
      </div>
      <Link className={styles.link} href="/">
        back to home
      </Link>
    </div>
  );
};

export default TaskDetails;
