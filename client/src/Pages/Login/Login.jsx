import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './Login.css';
import { useNavigate } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";

export default function Login(){

    const [email,setEmail] = React.useState("")
    const [password,setPassword] = React.useState("")
    const [modalContent,setModalContent] = React.useState("")
    const [showModal,setShowModal] = React.useState(false)
    const navigate = useNavigate();

    function handleLogin(email, password) {
        setShowModal(true);
        axios.post("http://localhost:5000/auth/login", { email, password })
            .then((res) => {
                if (res.data.status === "Success") {
                    localStorage.setItem('token', res.data.token);
                    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
                    navigate('/');
                } else {
                    setModalContent(res.data.message);
                }
            })
            .catch((err) => {
                setModalContent(err.message);
            });
    }
    
    return(
        <div className="login" id='/login'>
            <h1>LOGIN</h1>
            <hr />
            <div className="info">
                <label htmlFor="email">Email :
                    <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </label>
                <label htmlFor="password">Password :
                    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </label>
            </div>
    <br />
            <button className="login-btn" onClick={()=>handleLogin(email,password)}>Submit</button>
    <br />
            <h3> Do not Have an Account ?</h3>
            <Link to='/register'>Register</Link>
        
        {showModal && (
            <div className="modal">
                <div className="modal-content">
                    {modalContent}
                    <RxCross1 className = "fa-icon" onClick={()=>setShowModal(false)}/>
                </div>
            </div>
        )}
        </div>
    )
}