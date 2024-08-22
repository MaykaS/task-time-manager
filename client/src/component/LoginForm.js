import { useState } from 'react';
import { IoClose } from "react-icons/io5";
import './LoginForm.css';
import axios from 'axios';
const apiUrl = "//localhost:5000"


const LoginForm  = ({onClose, onSuccessfulLogin, onNotification}) =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post(`${apiUrl}/login`,{email,password});
            if(response.status===200){
                console.log("response: ", response.data.token);
                localStorage.setItem('authToken',response.data.token)
                onNotification({message: response.data.message, type: 'Success'});
                onSuccessfulLogin();
                onClose();
            }
        }
        catch(error){
            onNotification({message: error.response?.data?.message || 'Login Failed',type: 'Error'});
        }
    }
    const handleClose=()=>{
        onClose();
    }

    return(
        <div className="form-overlay">  
            <div className="form-container">
            <button className="close-button" onClick={handleClose} ><IoClose /></button>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label>Email:</label>
                        <input type='email' id='email' value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                        <label>Password:</label>
                        <input type="password" id='password' value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                    </div>
                    <button type="submit" className="submit-button">Submit</button>
                </form>
            </div>
        </div>
    )
}
export default LoginForm;