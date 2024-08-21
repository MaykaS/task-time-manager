import { useState } from 'react';
import { IoClose } from "react-icons/io5";
import './LoginForm.css';


const LoginForm  = ({onClose, onSuccessfulLogin }) =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        alert('Login successful!');
        onSuccessfulLogin();
        onClose();
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
