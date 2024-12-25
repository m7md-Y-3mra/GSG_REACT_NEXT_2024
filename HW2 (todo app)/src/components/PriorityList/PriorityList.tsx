import PriorityBtn from "../PriorityBtn/PriorityBtn"
import './priorityList.css';
interface IProps {
    activePriority: number,
    onClick: (priorityVal: number) => void
}

export default function PriorityList({ activePriority, onClick }: IProps) {
    return (
        <div className="priority-btns">
            {
                [1, 2, 3, 4].map((priorityVal) => (
                    < PriorityBtn
                        key={priorityVal}
                        label={priorityVal}
                        activePriority={activePriority}
                        onClick={onClick}
                    />))
            }
        </div>
    )
}
