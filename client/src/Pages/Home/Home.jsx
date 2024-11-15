import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaRegPlusSquare, FaArrowRight, FaTasks } from "react-icons/fa";
import './Home.css';

export default function Home() {
    const [tasks, setTasks] = useState([]);
    const [editTaskId, setEditTaskId] = useState(null);
    const [editTaskData, setEditTaskData] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchOption, setSearchOption] = useState("title");
    const [showModalWarning, setShowModalWarning] = useState(false);
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
    }, [navigate]);

    const handleEditClick = (task) => {
        setEditTaskId(task._id);
        setEditTaskData(task);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditTaskData({ ...editTaskData, [name]: value });
    };

    const handleSaveClick = (taskId) => {
        axios.put(`http://localhost:5000/tasks/${taskId}`, editTaskData)
            .then((res) => {
                setTasks(tasks.map(task => task._id === taskId ? res.data : task));
                setEditTaskId(null);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleDeleteClick = (task) => {
        setTaskToDelete(task);
        setShowModal(true);
    };

    const handleDeleteConfirm = () => {
        axios.delete(`http://localhost:5000/tasks/${taskToDelete._id}`)
            .then(() => {
                setTasks(tasks.filter(task => task._id !== taskToDelete._id));
                setShowModal(false);
                setTaskToDelete(null);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleDeleteCancel = () => {
        setShowModal(false);
        setTaskToDelete(null);
    };

    const filteredTasks = tasks.filter(task => {
        if (searchOption === "title") {
            return task.title.toLowerCase().includes(searchQuery.toLowerCase());
        } else if (searchOption === "status") {
            return task.status.toLowerCase().includes(searchQuery.toLowerCase());
        } else if (searchOption === "priority") {
            return task.priority.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return false;
    });

    function handleLogOut() {
        localStorage.removeItem("token");
        delete axios.defaults.headers.common['Authorization'];
        navigate('/login');
    }

    return (
        <div className="home" id='/'>
            <div className="nav">
                <h1> <FaTasks /> TASK MANAGER</h1>
                <div className="search-container">
                    <select name="searchOption" value={searchOption} className="des" onChange={(e) => setSearchOption(e.target.value)}>
                        <option value="title">Title</option>
                        <option value="status">Status</option>
                        <option value="priority">Priority</option>
                    </select>
                    <input
                        type="text" className="des"
                        placeholder={`Search by ${searchOption}`}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="create-click">
                    <Link to='/create'><FaRegPlusSquare className="fa-icon create-icon" /></Link>
                    <h1>Create</h1>
                </div>
                <button onClick={handleLogOut}>Log Out</button>
            </div>

            {!tasks.length ?
                <div className="empty">
                    <h1> No Active Tasks</h1>
                    <Link to='/create'>Add New Task<FaArrowRight className="fa-icon" /></Link>
                </div>
                :
                <ul className="tasks">
                    {
                        filteredTasks.map((task, index) => (
                            <div className="taskPlusIdx" key={index}>
                                <div className="idx">{index + 1}</div>
                                <li className='task'>
                                    <div className="left">
                                        {editTaskId === task._id ? (
                                            <>
                                                <div className="holder">
                                                    <div className="heading">Title : </div>
                                                    <input type="text" name="title" className="title matter" value={editTaskData.title} onChange={handleInputChange} />
                                                </div>
                                                <div className="holder">
                                                    <div className="heading">Description : </div>
                                                    <input type="text" name="description" className="des matter" value={editTaskData.description} onChange={handleInputChange} />
                                                </div>
                                                <div className="holder">
                                                    <div className="heading">Status : </div>
                                                    <select name="status" className="status matter" value={editTaskData.status} onChange={handleInputChange}>
                                                        <option value="pending">Pending</option>
                                                        <option value="in-progress">In-progress</option>
                                                        <option value="completed">Completed</option>
                                                    </select>
                                                </div>
                                                <div className="holder">
                                                    <div className="heading">Priority : </div>
                                                    <select name="priority" className="priority matter" value={editTaskData.priority} onChange={handleInputChange}>
                                                        <option value="low">Low</option>
                                                        <option value="medium">Medium</option>
                                                        <option value="high">High</option>
                                                    </select>
                                                </div>
                                                <div className="holder">
                                                    <div className="heading">Due Date : </div>
                                                    <input type="text" name="dueDate" className="dueDate matter" value={editTaskData.dueDate} onChange={handleInputChange} />
                                                </div>
                                                <button className="save-btn" onClick={() => handleSaveClick(task._id)}>Save</button>
                                            </>
                                        ) : (
                                            <>
                                                <div className="holder">
                                                    <div className="heading">Title : </div>
                                                    <div className="title matter">{task.title}</div>
                                                </div>
                                                <div className="holder">
                                                    <div className="heading">Description : </div>
                                                    <div className="des matter">{task.description}</div>
                                                </div>
                                                <div className="holder">
                                                    <div className="heading">Status : </div>
                                                    <div className="status matter">{task.status}</div>
                                                </div>
                                                <div className="holder">
                                                    <div className="heading">Priority : </div>
                                                    <div className="priority matter">{task.priority}</div>
                                                </div>
                                                <div className="holder">
                                                    <div className="heading">Due Date : </div>
                                                    <div className="dueDate matter">{task.dueDate}</div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    <div className="right">
                                        <FaEdit className="fa-icon" onClick={() => handleEditClick(task)} />
                                        <FaTrash className="fa-icon" onClick={() => handleDeleteClick(task)} />
                                    </div>
                                </li>
                            </div>
                        ))
                    }
                </ul>
            }

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Confirm Delete ?</h2>
                        <p>Are you sure you want to delete this task?</p>
                        <button onClick={handleDeleteConfirm}>Yes</button>
                        <button onClick={handleDeleteCancel}>No</button>
                    </div>
                </div>
            )}

            {showModalWarning && (
                <div className="modal">
                    <div className="modal-content">
                        You are Not Logged In
                    </div>
                </div>
            )}
        </div>
    );
}