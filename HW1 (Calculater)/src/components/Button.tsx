interface ButtonProps {
    value: string,
    bg: string,
    onClick: (value: string) => void,
}

//  bg-[#dfda45]
export default function Button({ value, bg, onClick }: ButtonProps) {
    return (
        <button
            // style={{backgroundColor: bg}}
            className={`${bg} p-2 rounded-lg hover:opacity-80 transition-all duration-300`}
            onClick={() => onClick(value)}
        >
            {value}
        </button>
    );
}