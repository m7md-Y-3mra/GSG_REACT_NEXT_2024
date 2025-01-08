import { useState } from "react";
import PriorityList from "../PriorityList/PriorityList";

export default function TodoForm({addTodo} : {addTodo: (todoLabel: string, priorityClass: number) => void}) {
  const [todoLabel, setTodoLabel] = useState("");
  const [isEmptyInput, setIsEmptyInput] = useState(false);
  const [priorityClass, setPriorityClass] = useState<number>(4);
  

  const handleAddTodo = () => {
    if (todoLabel.trim() !== "") {
      addTodo(todoLabel, priorityClass);
      setIsEmptyInput(false);
      setTodoLabel("");
      return;
    }
    setIsEmptyInput(true);
  };

  return (
    <div className="header-form">
      <input
        type="text"
        placeholder="what to do?"
        value={todoLabel}
        onChange={(e) => {
          setTodoLabel(e.target.value);
          setIsEmptyInput(false);
        }}
        onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
        className={isEmptyInput ? "error" : ""}
      />
      <PriorityList activePriority={priorityClass} onClick={setPriorityClass} />
      <button onClick={handleAddTodo}>Add</button>
    </div>
  );
}
