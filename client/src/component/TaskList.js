import { useEffect, useState } from "react";
import axios from "axios";
import { HiOutlineTrash } from "react-icons/hi2";
import { CiEdit } from "react-icons/ci";
import { FaRegFolderOpen } from "react-icons/fa";
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
    
    const deleteTask= async(task_id)=>{
        try{
            const token = localStorage.getItem('authToken'); // Retrieve the token
            const response = await axios.delete(`${apiUrl}/tasks/${task_id}`,{headers: {
                Authorization: `Bearer ${token}` // Set the token in the header
            }});
            if(response.status===200){
                setTasks((prevTasks) => prevTasks.filter(task => task._id !== task_id));
                onNotification({ message: 'Task Deleted Successefuly', type: 'Success' });
            }
        }
        catch(error){
            onNotification({ message: 'Failed to delete task', type: 'Error' });
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

