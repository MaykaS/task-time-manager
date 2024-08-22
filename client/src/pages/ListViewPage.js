import { useEffect, useState } from "react";
import Footer from "../component/Footer";
import NavBar from "../component/NavBar";
import './ListViewPage.css';
import { HiPlus } from "react-icons/hi";
import Notification from "../component/Notification";
import TaskList from "../component/TaskList";


const ListViewPage = () =>{
    const [notification, setNotification] = useState({message: '', type: ''});

    const AddTask=()=>{
        alert("adding task!");
    }
    const handleNotification=(notification)=>{
        setNotification(notification);  
    }    

    return(
        <div className="list-container">
            <h1>List view</h1>
            <div className="buttons">
                    <button className="addbutton" onClick={AddTask}><HiPlus /></button>  
            </div>
            <NavBar/>
            <TaskList onNotification={handleNotification}/>
            <Footer/>
            {notification.message && <Notification message={notification.message} type={notification.type} onClose={()=>setNotification({message:'',type:''})} />} {/* Show Notification */}
        </div>
        
    )
};

export default ListViewPage;
//TODO:
//1. connect add task button to actual new form to add task - can i use the same compinenet to creat and edit?
//2. list of tasks from the user 
//3. once press the task it opens up un a pop up 