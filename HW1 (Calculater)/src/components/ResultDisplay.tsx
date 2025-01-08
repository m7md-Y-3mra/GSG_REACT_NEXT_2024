interface ResultDisplayProps {
    result: string;
    error: string;
}

export default function ResultDisplay({ result, error }: ResultDisplayProps) {
    return (
        <div className="">
            <div className="h-12 px-3 flex items-center text-white  bg-blue-500 rounded-lg shadow-md text-2xl font-bold">{result}</div>
            <div className="h-4 my-1 flex items-center justify-center text-red-500 text-xs">{error}</div>
        </div>
    )
}
