import { useState } from "react";
import { RiHomeHeartLine } from "react-icons/ri";
import { MdWork } from "react-icons/md";
import { LiaSmileBeamSolid } from "react-icons/lia";
import { IoIosFitness } from "react-icons/io";
import { SlPlane } from "react-icons/sl";
import { TbDog } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import './TaskForm.css';
import axios from 'axios';
const apiUrl = "//localhost:5000";



const TaskForm=({onNotification,onClose, onTaskCreated,onTaskUpdated,initialData})=>{

    const[title,setTitle] = useState(initialData?.title || '');
    const[category,setCategory] = useState(initialData?.category || '');
    const[description,setDescription] = useState(initialData?.description || '');
    const[dueDate,setDueDate] = useState(initialData?.dueDate || '');
    const[time,setTime] = useState(initialData?.time || '');
    const[priority,setPriority] = useState(initialData?.priority || 'Low');
    const[isDropdownOpen, setIsDropdownOpen] = useState(false); // For managing dropdown category


    const categories=[
        {name: 'Home', icon: <RiHomeHeartLine />},
        {name: 'Work', icon: <MdWork />},
        {name: 'Personal', icon: <LiaSmileBeamSolid />},
        {name: 'Fitness', icon:<IoIosFitness />},
        {name: 'Travel', icon: <SlPlane />},
        {name: 'Dylan', icon: <TbDog />}
    ]

    const handleCategorySelect = (cat) => {
        setCategory(cat.name);
        setIsDropdownOpen(false); // Close the dropdown when a category is selected
    };

    const handleSubmit= async(e)=>{
        e.preventDefault();
        try{
            const token = localStorage.getItem('authToken');
            const config = {headers: { Authorization: `Bearer ${token}` }};
            let response;
            //editing
            if(initialData){
                response = await axios.put(`${apiUrl}/tasks/${initialData._id}`,
                    {title,category,description,dueDate,time,priority},config)
                    if(response.status===200){
                        onNotification({message: response.data.message, type: 'Success'});
                        onTaskUpdated(response.data.task);
                    }
            }else{ //creating
                response = await axios.post(`${apiUrl}/tasks`,
                    {title,category,description,dueDate,time,priority},config)
                    if(response.status===201){
                        onNotification({message: response.data.message, type: 'Success'});
                        onTaskCreated(response.data.task);
                    }
            }
            onClose();
        }     
        catch(error){
            onNotification({message: error.response?.data?.message || 'Operation Failed',type: 'Error'});
        }
    }

    const handleClose=()=>{
        onClose();
    }

    return(
        <div className="form-overlay">
            <div className="form-container">
                <button className="close-button" onClick={handleClose} ><IoClose /></button>
                <h2>{initialData ? 'Edit Task' : 'Create Task'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className='form-row'>
                        <label>Title:</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </div>
                    <div className='form-row'>
                    <label>Category:</label>
                    <div className="category-dropdown">
                            <button type="button" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                {category || "Select a category"}
                            </button>
                            {isDropdownOpen && (
                                <div className="dropdown-list">
                                    {categories.map((cat) => (
                                        <div
                                            key={cat.name}
                                            className={`dropdown-option ${category === cat.name ? 'selected' : ''}`}
                                            onClick={() => handleCategorySelect(cat)}
                                        >
                                            {cat.icon} {cat.name}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='form-row'>
                        <label>Description:</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)}/>
                    </div>

                    <div className="form-row">
                        <label>DueDate:</label>
                        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
                    </div>
                    <div className="form-row">
                        <label>Time:</label>
                        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} pattern="[0-9]{2}:[0-9]{2}" required />
                    </div>
                    <div className='form-row priority-row'>
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
//TODO: auto updat somehow?