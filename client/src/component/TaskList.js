import { useEffect, useState } from "react";
import axios from "axios";
import { HiOutlineTrash } from "react-icons/hi2";
import { CiEdit } from "react-icons/ci";
import { FaRegFolderOpen } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";
import { MdDoNotDisturb } from "react-icons/md";
import TaskForm from "./TaskForm";
const apiUrl = "//localhost:5000";


const TaskList = ({onNotification})=>{
    const [tasks,setTasks]=useState([]);
    const [taskToEdit, setTaskToEdit] = useState(null); //for the task to edit
    const [openTaskId, setOpenTaskId] = useState(null);
    

    const getTasks = async()=>{
        try{
            const token = localStorage.getItem('authToken'); // Retrieve the token
            const response = await axios.get(`${apiUrl}/tasks`,{headers: {
                Authorization: `Bearer ${token}` // Set the token in the header
            }});
            setTasks(response.data);
        }
        catch(error){
            onNotification({ message: 'Failed to get tasks', type: 'Error' });
        }
    } 
    useEffect(()=>{getTasks()},[]);

    const openTask=(taskId)=>{
        console.log(`opening ${taskId}`)
        setOpenTaskId((prevId)=> (prevId === taskId ? null : taskId));
    }

    const editTask=(taskId)=>{
        const taskToEdit = tasks.find(task => task._id === taskId);
        setTaskToEdit(taskToEdit);
    }

    const handleTaskUpdate=(updatedTask)=>{
        setTasks((prevTasks)=>(prevTasks.map(task=>task._id===updatedTask._id ? updatedTask : task)));
        setTaskToEdit(null);
    }
    
    const deleteTask= async(taskId)=>{
        try{
            const token = localStorage.getItem('authToken'); // Retrieve the token
            const response = await axios.delete(`${apiUrl}/tasks/${taskId}`,{headers: {
                Authorization: `Bearer ${token}` // Set the token in the header
            }});
            if(response.status===200){
                setTasks((prevTasks) => prevTasks.filter(task => task._id !== taskId));
                onNotification({ message: 'Task Deleted Successefuly', type: 'Success' });
            }
        }
        catch(error){
            onNotification({ message: 'Failed to delete task', type: 'Error' });
        }
    }

    const changeComplete = async(taskTitle,taskId, completed)=>{
        console.log(`complete ${taskId}`);
        const token = localStorage.getItem('authToken');
        const config = {headers: { Authorization: `Bearer ${token}` }};
        let changeTo = !completed;
        console.log(changeTo);
        let response;
        if(completed){ //to-uncomplete
            response = await axios.put(`${apiUrl}/tasks/${taskId}`,
                {title:taskTitle,completed:changeTo},config);
                console.log(response);
                if(response.status===200){
                    onNotification({message: response.data.message, type: 'Success'});
                    handleTaskUpdate(response.data.task);
                }
        }else{ //tocomplete
            try{
                console.log("tocomplete", taskId);
                response = await axios.patch(`${apiUrl}/tasks/${taskId}/complete`,{},{headers: { Authorization: `Bearer ${token}` }});
                if(response.status===200){
                    onNotification({ message: 'Task Completed Successefuly', type: 'Success' });
                    handleTaskUpdate(response.data.task);
                }
            }
            catch(error){
                onNotification({ message: 'Failed to update task', type: 'Error' });
            }
        }
    }

    return(
            <div className="task-list">
                {tasks.map((task) => (
                    <div className="task" key={task._id} > {/* Assuming each task has a unique id */}
                        <div className="task-title">{task.title}</div>
                        <div className="task-details">
                            <strong>Due:</strong>&nbsp;{task.dueDate} {task.time} &nbsp; <strong>Priority:</strong>&nbsp;{task.priority}
                        </div>
                        {openTaskId === task._id && (
                            <div className="task-extra-details">
                                <p><strong>Description:</strong> {task.description}</p>
                                <p><strong>Category:</strong> {task.category}</p>
                            </div>
                        )}
                        <div className="task-actions">
                            <button className = "open-button" onClick={()=>openTask(task._id)}><FaRegFolderOpen /></button>
                            <button className = "edit-button" onClick={()=>editTask(task._id)}><CiEdit /></button>
                            <button className = "delete-button" onClick={()=>deleteTask(task._id)}><HiOutlineTrash /></button>
                            <button className = "complete-status-button" onClick={()=>changeComplete(task.title,task._id,task.completed)}> {task.completed ? <IoMdCheckmark/>: <MdDoNotDisturb/> }</button>
                        </div>
                        
                         {taskToEdit && (
                            <TaskForm
                                initialData={taskToEdit}
                                onClose={() => setTaskToEdit(null)}
                                onNotification={onNotification}
                                onTaskUpdated={handleTaskUpdate} // Callback for updating the task list after editing
                            />
                        )}
                    </div>
                ))}
            </div>
    )
}

export default TaskList;
//TODO:
//check box to completed - and uncheck 
