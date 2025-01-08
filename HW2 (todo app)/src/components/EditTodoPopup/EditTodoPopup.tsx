import { useState } from "react";
import Popup from "../Popup/Popup";
import PriorityList from "../PriorityList/PriorityList";
import { todoItem } from "../../types";

interface TodoPopup {
  editingTodo : todoItem | null;
  stopEditing: () => void;
  updateTodoDetails: (editingTodoId: number, updatedLabel: string, updatedPriority: number) => void;
  setEditingTodo: React.Dispatch<React.SetStateAction<todoItem | null>>
}

function EditTodoPopup({editingTodo, stopEditing, updateTodoDetails, setEditingTodo}: TodoPopup) {
  
  const [isInputEmpty, setIsInputEmpty] = useState(false);
  
  function handleOkClick(updatedLabel: string, editedPriorityClass: number) {
    if (updatedLabel.trim() === "") {
      return true;
    }
    updateTodoDetails(editingTodo?.id ?? 0, updatedLabel, editedPriorityClass);
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
                setIsInputEmpty(false);
              }}
              onKeyDown={(e) =>
                e.key === "Enter" &&
                setIsInputEmpty(
                  handleOkClick(editingTodo.label, editingTodo.priority)
                )
              }
              placeholder="Edit the todo ..."
              value={editingTodo.label}
              className={isInputEmpty ? "error" : ""}
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
                  setIsInputEmpty(
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

export default EditTodoPopup;
