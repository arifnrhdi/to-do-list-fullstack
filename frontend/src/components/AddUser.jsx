import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const [title, setTitle] = useState("");
  const [task, setTask] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:2257/users",{
        title: title,
        task: task
      })
      navigate("/");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
      console.log(error);
    }
  };

  return (
    <div className="container add-user-box col-6 bg-white border rounded-4 p-4 shadow box-area">
      <form onSubmit={saveUser}>
        <p className="h2 mb-4">Add</p>
        <span className="text-danger alert mb-3">{msg}</span>
        <div className="mb-3">
          <label htmlFor="exampleInputName" className="form-label">
            Title
          </label>
          <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputTask" className="form-label">
            Task
          </label>
          <textarea className="form-control text-area" id="floatingTextarea" value={task} onChange={(e) => setTask(e.target.value)}></textarea>
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Save
        </button>
      </form>
    </div>
  );
};

export default AddUser;
