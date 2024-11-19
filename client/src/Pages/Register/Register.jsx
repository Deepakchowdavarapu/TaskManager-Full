import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";

import './Register.css';

export default function Register(){

    const [name,setName] = React.useState("")
    const [email,setEmail] = React.useState("")
    const [password,setPassword] = React.useState("")
    const [modalContent , setModalContent] = React.useState("")
    const [showModal,setShowModal] = React.useState(false)

    function handleRegister(name,email,password){
        axios.post("https://taskmanager-full-backend.onrender.com/auth/register" , {name,email,password})
        .then((res)=>{
            // console.log(res.data)
            if(res.data.id){
                setModalContent("Successfully registered . You can head to the Login page !")
            }else{
                setModalContent(res.data.message)
            }
            // console.log(modalContent)
        })
        .catch((err)=>{
            setModalContent(err.message)
            // console.log(err)
        // console.log(modalContent)
            // console.log(showModal)
        })
    }
    
    return(
        <div className="register login" id='/register'>
            <h1>REGISTER</h1>
            <hr />
            <div className="info">
            <label htmlFor="name">Name : 
                <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
            </label>
            <label htmlFor="email" >Email : 
                <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </label>
            <label htmlFor="password" >Password : 
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </label>
            </div>
    <br />
            <button className="login-btn" onClick={()=>[handleRegister(name,email,password),setShowModal(true)]}>Submit</button>
    <br />
            <h3>Have an Account ?</h3>
            <Link to='/login'>Login</Link>

            {/* {modalContent} */}

        {showModal && (
            <div className="modal ">
                <div className="modal-content modal-register">
                    {modalContent}
                <RxCross1 className = "fa-icon" onClick={()=>setShowModal(false)}/>
                </div>
            </div>
        )
            }

        </div>
    )
}
