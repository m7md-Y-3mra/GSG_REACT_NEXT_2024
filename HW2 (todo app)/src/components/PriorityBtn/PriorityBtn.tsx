
interface IProps {
    label: number
    activePriority: number,
    onClick: (priorityVal: number) => void
}

export default function PriorityBtn({label, activePriority, onClick} : IProps) {
    return (
        <button
            className={`priority-btn-${label} ${label == activePriority && 'active'}`}
            onClick={() => onClick(label)}
        >
            {label}
        </button>
        
    )
}