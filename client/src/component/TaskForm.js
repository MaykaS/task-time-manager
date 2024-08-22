import { useState } from "react";
import { RiHomeHeartLine } from "react-icons/ri";
import { MdWork } from "react-icons/md";
import { LiaSmileBeamSolid } from "react-icons/lia";
import { IoIosFitness } from "react-icons/io";
import { SlPlane } from "react-icons/sl";
import { TbDog } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import axios from 'axios';
const apiUrl = "//localhost:5000";


const TaskForm=({onNotification,onClose, onTaskCreated})=>{

    const[title,setTitle] = useState('');
    const[category,setCategory] = useState('');
    const[description,setDescription] = useState('');
    const[dueDate,setDueDate] = useState('');
    const[time,setTime] = useState('');
    const[priority,setPriority] = useState('Low');

    const categories=[
        {name: 'Home', icon: <RiHomeHeartLine />},
        {name: 'Work', icon: <MdWork />},
        {name: 'Personal', icon: <LiaSmileBeamSolid />},
        {name: 'Fitness', icon:<IoIosFitness />},
        {name: 'Travel', icon: <SlPlane />},
        {name: 'Dylan', icon: <TbDog />}
    ]

    const handleSubmit= async(e)=>{
        e.preventDefault();
        try{
            const token = localStorage.getItem('authToken');
            const response = await axios.post(`${apiUrl}/tasks`,
                {title,category,description,dueDate,time,priority},
                {headers: { Authorization: `Bearer ${token}` }});
                if(response.status===201){
                    onNotification({message: response.data.message, type: 'Success'});
                    onTaskCreated(response.data);
                    onClose();
                }
        }
        catch(error){
            onNotification({message: error.response?.data?.message || 'Creation Failed',type: 'Error'});
        }
    }

    const handleClose=()=>{
        onClose();
    }

    return(
        <div className="form-overlay">
             <div className="form-container">
                <button className="close-button" onClick={handleClose} ><IoClose /></button>
                <h2>Creat Task</h2>
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                    <label>Title:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

                <label>Category:</label>
                <div className="category-selector">
                    {categories.map((cat) => (
                        <div key={cat.name} className={`category-option ${category === cat.name ? 'selected' : ''}`}
                             onClick={() => setCategory(cat.name)}>
                            {cat.icon} {cat.name}
                        </div>
                    ))}
                </div>

                <label>Description:</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

                <label>Due Date:</label>
                <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />

                <label>Time:</label>
                <input type="time" value={time} onChange={(e) => setTime(e.target.value)} pattern="[0-9]{2}:[0-9]{2}" required />

                <label>Priority:</label>
                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                    </div>
                    <button type="submit" className="submit-button">Submit</button>
                </form>
            </div>
        </div>
    )


}
export default TaskForm;
//TODO: 
//1. choose from specific categories
//2. fix the style