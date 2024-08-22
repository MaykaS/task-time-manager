import { IoClose } from "react-icons/io5";
import './Notification.css'

const Notification=({message,type,onClose})=>{
    const handleClose=()=>{
        onClose();
    }

    return(
        <div className={`notification ${type}`}>
            <span>{message}</span>
            <button className="close-button" onClick={handleClose} ><IoClose /></button>
        </div>
    )
}
export default Notification;
//TODO:
// notification doesnt have the needed color
// x to close is on the writing