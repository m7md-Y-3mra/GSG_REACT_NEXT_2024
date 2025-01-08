import "./Popup.css";
import { Close } from "@mui/icons-material";
interface IProps {
  onClose: () => void;
  header: string;
  className: string;
  children: any
}
export default function Popup({ onClose, header, className, children } : IProps) {
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
