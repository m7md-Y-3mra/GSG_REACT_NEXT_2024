import { usePersistentState } from "../../hooks/usePersistentState";
import Popup from "../Popup/Popup";

export default function FeaturesPopup() {
  const [isNewUser, setIsNewUser] = usePersistentState<boolean>("newUser", true);

  function handleCloseEditClick() {
    setIsNewUser(false);
  }

  return (
    <div className={isNewUser ? "popup-container" : ""}>
      {isNewUser && (
        <Popup
          onClose={handleCloseEditClick}
          header="App Features"
          className="features-popup"
        >
          <div className="body">
            <ul>
              <li data-num="1">Add tasks</li>
              <li data-num="2">Delete tasks</li>
              <li data-num="3">Edit tasks</li>
              <li data-num="4">Mark tasks as completed</li>
              <li data-num="5">Filter tasks</li>
              <li data-num="6">Dark/Light Mode</li>
              <li data-num="7">Persistent Data</li>
              <li data-num="8">Clear Completed Tasks</li>
              <li data-num="9">Set Task Priority</li>
            </ul>
            <div className="popup-btns">
              <button onClick={handleCloseEditClick}>Close</button>
            </div>
          </div>
        </Popup>
      )}
    </div>
  );
}
