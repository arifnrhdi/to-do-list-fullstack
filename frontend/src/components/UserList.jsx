import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserList = () => {
  const [users, setUser] = useState([]);

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:2257/users");
    setUser(response.data);
  };

  const updateTaskStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:2257/users/${id}`, { status });
      getUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:2257/users/${id}`);
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5 bg-white border rounded-4 p-4 shadow box-area">
      <Link to={'add'} className="btn btn-success rounded-3 border px-3 mb-3 fw-semibold">
        Add +
      </Link>

      <div className="row mb-2">
        {users.map((user, index) => (
          <div key={user.id} className="col-lg-3 col-sm-6 col-md-4 card-group text-break justify-content-evenly">
            <div className="row g-0 border border-dark border-opacity-25 shadow rounded-4 overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
              <div className="col p-4 d-flex flex-column position-static">
                <h4 className="mb-1">{user.title}</h4>
                <div className="mb-2 text-body-secondary">Created at {user.createdAt}</div>
                <p className="card-text mb-auto">{user.task}</p>
                <div className="mt-2">
                  Status: {user.status ? "Complete" : "In Progress"}
                  <button className="btn btn-info btn-sm text-light border fw-semibold" onClick={() => updateTaskStatus(user.id, !user.status)}>
                    {user.status ? "Mark as In Progress" : "Mark as Complete"}
                  </button>
                </div>
                <div className=" pt-3">
                  <Link to={`update/${user.id}`} className="btn btn-outline-info fw-semibold btn-sm">
                    Edit
                  </Link>
                  <Link onClick={() => deleteUser(user.id)} className="btn btn-outline-danger fw-semibold btn-sm ms-2">
                    Delete
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
