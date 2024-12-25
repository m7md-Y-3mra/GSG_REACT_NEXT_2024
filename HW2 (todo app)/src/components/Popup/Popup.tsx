import "./Popup.css";
import { Close } from "@mui/icons-material";
export default function Popup({ onClose, header, className, children }) {
  return (
    <div className={`popup ${className}`}>
      <div className="header">
        <h3>{header}</h3>
        <Close onClick={onClose} />
      </div>
      {children}
    </div>
  );
}
