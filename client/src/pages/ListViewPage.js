import { useEffect, useState } from "react";
import Footer from "../component/Footer";
import NavBar from "../component/NavBar";
import './ListViewPage.css';
import { HiPlus } from "react-icons/hi";
import Notification from "../component/Notification";
import TaskList from "../component/TaskList";
import TaskForm from "../component/TaskForm";


const ListViewPage = () =>{
    const [notification, setNotification] = useState({message: '', type: ''});
    const [showTaskForm,setShowTaskForm] = useState(false);
    const [tasks,setTasks] = useState([]);

    const AddTask=(newTask)=>{
        setTasks((prevTask) => [...prevTask, newTask]);
        setShowTaskForm(false);
    }
    const handleCloseForm = () => {
        setShowTaskForm(false);
    };

    return(
        <div className="list-container">
            <h1>List view</h1>
            <div className="buttons">
                    <button className="addbutton" onClick={()=>setShowTaskForm(true)}><HiPlus /></button>  
            </div>
            <NavBar/>
            <TaskList tasks={tasks} onNotification={setNotification} />
            <Footer/>
            {showTaskForm && <TaskForm  onClose={handleCloseForm} onNotification={setNotification} onTaskCreated={AddTask}/>} {/* Show TaskForm Form */}
            {notification.message && <Notification message={notification.message} type={notification.type} onClose={()=>setNotification({message:'',type:''})} />} {/* Show Notification */}
        </div>
        
    )
};

export default ListViewPage;
//TODO:
//4. filter and orderby
//auto update

