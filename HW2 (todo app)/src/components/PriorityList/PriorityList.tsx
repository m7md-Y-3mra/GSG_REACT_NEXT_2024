import PriorityBtn from "../PriorityBtn/PriorityBtn";
import "./priorityList.css";
interface IProps {
  activePriority: number;
  onClick: (priorityClass: number) => void;
}

export default function PriorityList({ activePriority, onClick }: IProps) {
  return (
    <div className="priority-btns">
      {[1, 2, 3, 4].map((priorityClass) => (
        <PriorityBtn
          key={priorityClass}
          label={priorityClass}
          activePriority={activePriority}
          onClick={() => onClick(priorityClass)}
        />
      ))}
    </div>
  );
}
