import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import './Create.css';

export default function Create() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("pending");
    const [priority, setPriority] = useState("low");
    const [dueDate, setDueDate] = useState("");
    const [modalContent,setModalContent] = React.useState("")
    const [showModal,setShowModal] = React.useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate('/login');
        } else {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            axios.get("http://localhost:5000/tasks")
                .then((res) => {
                    setTasks(res.data.tasks);
                    if (res.data.user) {
                    }
                })
                .catch((err) => {
                    console.log("Error:", err);
                    console.log("Error Response:", err.response);
                });
        }
    }, []);

    const handleCreate = (title, description, status, priority, dueDate) => {
        setShowModal(true)
        axios.post("https://taskmanager-full-backend.onrender.com", { title, description, status, priority, dueDate })
            .then((res) => {
                // console.log(res.data);
                if(res.data._id){
                    setModalContent(res.data._id);
                    navigate('/');
                }else{
                    setModalContent(res.data.message);
                }
            })
            .catch((err) => {
                setModalContent(err.message);
            });
    };

    return (
        <div className="create" id="/create">
            <h1>CREATE NEW TASK</h1>
                <hr />
            <div className="left">
                <div className="holder">
                    <div className="heading">Title : </div>
                    <input type="text" name="title" className="title matter" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="holder">
                    <div className="heading">Description : </div>
                    <input type="text" name="description" className="des matter" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="holder">
                    <div className="heading">Status : </div>
                    <select name="status" className="status matter" value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="pending">Pending</option>
                        <option value="in-progress">In-progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <div className="holder">
                    <div className="heading">Priority : </div>
                    <select name="priority" className="priority matter" value={priority} onChange={(e) => setPriority(e.target.value)}>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
                <div className="holder">
                    <div className="heading">Due Date : </div>
                    <input type="date" name="dueDate" className="dueDate matter" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                </div>
                <button className='save-btn create-btn' onClick={() => handleCreate(title, description, status, priority, dueDate)}>Create</button>
            </div>
            <Link to='/'>Home</Link>

            {showModal && (
            <div className="modal">
                <div className="modal-content">
                    {modalContent}
                    <RxCross1 className = "fa-icon" onClick={()=>setShowModal(false)}/>
                </div>
            </div>
        )}
        </div>
    );
}
