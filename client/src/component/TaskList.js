import { useEffect, useState } from "react";
import axios from "axios";
const apiUrl = "//localhost:5000";

const TaskList = ({onNotification})=>{
    const [tasks,setTasks]=useState([]);

    const getTasks = async()=>{
        try{
            const token = localStorage.getItem('authToken'); // Retrieve the token
            console.log(token);
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
    const openTaskDetail=()=>{
        alert("opening task");
    }

    return(
        <div>
            <div className="task-list">
                {tasks.map((task) => (
                        <div key={task._id} className="task-item" onClick={() => openTaskDetail(task)}>
                            <h2>{task.title}</h2>
                            <p>Priority: {task.priority}</p>
                            <p>Category: {task.category}</p>
                            <p>Due Date: {task.dueDate}</p>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default TaskList;