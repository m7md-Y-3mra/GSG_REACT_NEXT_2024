import Image from "next/image";
import React, { FC } from "react";
import pendingIcon from '@/public/pending.png';
import completedIcon from '@/public/check-mark.png';
import styles from './TaskItem.module.css';

interface TaskItemProps {
  title: string;
  completed: boolean; 
}

const TaskItem:FC<TaskItemProps> = ({title, completed}) => {
  const icon = completed ? completedIcon : pendingIcon;

  return (
    <div className={styles.wrapper}>
      <div>{title}</div>
      <Image src={icon} alt='status task icon' width={25} loading="lazy"	/>
    </div>
  );
};

export default TaskItem;
