"use client";
import React, { FC, useRef, useState } from "react";
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
  const [isCopied, setIsCopied] = useState(false);
  const clipboardRef = useRef<Clipboard>(navigator.clipboard);

  const handleCopyTitle = async () => {
    try {
      await clipboardRef.current.writeText(todo.title);
      setIsCopied(true);
      console.log(`"${todo?.title}" was copied to your clipboard.`);
    } catch (err) {
      console.error(`Error copying text to clipboard: ${err}`);
      setIsCopied(false);
    }
  };

  return (
    <div>
      <div className={`${styles.wrapper} ${todo.priority}`}>
        <Image
          src={todo?.completed ? completedIcon : pendingIcon}
          alt={todo?.completed ? "Completed task" : "Pending task"}
          width={150}
          height={150}
        />
        <div>{todo?.id}</div>
        <div>{todo?.title}</div>
        <div>{todo?.completed ? "completed" : "pending"}</div>
        <div>{todo.priority}</div>
      </div>
      <div className={styles.btns}>
        <Link className={styles.link} href="/">
          back to home
        </Link>
        <button onClick={handleCopyTitle} className={styles.link}>
          {isCopied ? "Copied!" : "Copy Title"}
        </button>
      </div>
    </div>
  );
};

export default TaskDetails;
