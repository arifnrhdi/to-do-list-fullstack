import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
  const [title, setTitle] = useState("");
  const [task, setTask] = useState("");
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    getUserById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:2257/users/${id}`, {
        title,
        task,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const getUserById = async () => {
    const response = await axios.get(`http://localhost:2257/users/${id}`);
    setTitle(response.data.title);
    setTask(response.data.task);
  }

  return (
    <div className="container add-user-box col-6 bg-white border rounded-4 p-4 shadow box-area">
      <form onSubmit={updateUser}>
        <p className="h2 mb-5">Edit</p>
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
          Update
        </button>
      </form>
    </div>
  );
};

export default EditUser;

