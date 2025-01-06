import { useState } from "react";
import Popup from "../Popup/Popup";
import PriorityList from "../PriorityList/PriorityList";
import { todoItem } from "../../types";

interface todoPopup {
  editingTodo: todoItem | null;
  stopEditing: () => void;
  updateTodoDetails: (editingTodo: todoItem | null, updatedLabel: string, updatedPriority: number) => void;
  setEditingTodo: React.Dispatch<React.SetStateAction<todoItem | null>>

}

export default function EditTodoPopup({editingTodo, stopEditing, updateTodoDetails, setEditingTodo}: todoPopup) {
  const [isEditInputEmpty, setIsEditInputEmpty] = useState(false);
  

  function handleOkClick(updatedLabel: string, editedPriorityClass: number) {
    if (updatedLabel.trim() === "") {
      return true;
    }
    updateTodoDetails(editingTodo, updatedLabel, editedPriorityClass);
    stopEditing();
    return false;
  }

  return (
    <div className={editingTodo ? "popup-container" : ""}>
      {editingTodo && (
        <Popup onClose={stopEditing} header="Edit todo" className="edit-popup">
          <div className="body">
            <input
              onChange={(e) => {
                setEditingTodo({ ...editingTodo, label: e.target.value });
                setIsEditInputEmpty(false);
              }}
              onKeyDown={(e) =>
                e.key === "Enter" &&
                setIsEditInputEmpty(
                  handleOkClick(editingTodo.label, editingTodo.priority)
                )
              }
              placeholder="Edit the todo ..."
              value={editingTodo.label}
              className={isEditInputEmpty ? "error" : ""}
            />
            <PriorityList
              activePriority={editingTodo.priority}
              onClick={(priorityClass: number) =>
                setEditingTodo({ ...editingTodo, priority: priorityClass })
              }
            />
            <div className="popup-btns">
              <button
                onClick={() =>
                  setIsEditInputEmpty(
                    handleOkClick(editingTodo.label, editingTodo.priority)
                  )
                }
              >
                OK
              </button>
              <button onClick={stopEditing}>Close</button>
            </div>
          </div>
        </Popup>
      )}
    </div>
  );
}
