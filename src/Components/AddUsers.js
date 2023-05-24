import React, { useState, useRef, useEffect } from "react";
import ViewUsers from "./ViewUsers";
import axios from "axios";

const AddUsers = () => {
    const BaseUrl = "http://localhost:8000/";
  const [details, setDetails] = useState({ name: " ", userName: " " });
  const [edit, setEdit] = useState({
    status : false,
    _id : " "
  });
  const [list, setList] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [call, setCall] = useState(false);
  const nameRef = useRef();

  useEffect(() => {
    let newName = String(details.name).trim();
    let newUserName = String(details.userName).trim();
    if (newName.length !== 0 && newUserName.length !== 0) {
      return setIsDisabled(false);
    } else {
      return setIsDisabled(true);
    }
  }, [details.name, details.userName]);

  useEffect(() => {
   
   const callToFetch = async() => {
    try {
        const resp = await axios.get(BaseUrl);
        setList(resp.data);
        setCall(false);
      } catch (e) {
        console.log(e.message);
      }
   }
    callToFetch()
  }, [call]);

  const submitHandler = async (e) => {
    e.preventDefault();

    let newName = String(details.name).trim();
    let newUserName = String(details.userName).trim();

    if (newName.length !== 0 && newUserName.length !== 0) {
      if (edit.status === false) {
        await axios
          .post(BaseUrl, details)
          .then((resp) => console.log(resp))
          .catch((e) => console.log(e.message));
        setIsDisabled(true);
        setDetails({ ...details, name: " ", userName: " " });
      } else {
        await axios
          .put(BaseUrl, {...details, _id : edit._id })
        setDetails({ ...details, name: " ", userName: " " });
        setEdit({...edit, status : false, _id : " "});
      }
    }
    setCall(true);
  };

  const editHandler = async (userId) => {
    setEdit({...edit, status : true, _id : userId});
    const resp = await axios.get(`${BaseUrl}${userId}`);
    const user = await resp.data;
    setDetails({ ...details, name: user.name, userName: user.userName });
  };

  const deleteHandler = async (personId) => {
    console.log({personId});
    const resp = await axios.delete(`${BaseUrl}${personId}`);
    console.log(resp.data);
    setCall(true);
  };

  const changeHandler = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  return (
    <div className="main-container">
      <div className="input-container">
        <header className="input-header">Add user</header>
        <form onSubmit={submitHandler} className="form-container">
          <div className="input-elements">
            <label className="label">Name</label>
            <input
              type="text"
              name="name"
              value={details.name}
              onChange={changeHandler}
              ref={nameRef}
              className="text-fields"
              required
            />
          </div>
          <div className="input-elements">
            <label className="label">Username</label>
            <input
              type="text"
              name="userName"
              value={details.userName}
              onChange={changeHandler}
              className="text-fields"
              required
            />
          </div>
          <div>
            <button type="submit" disabled={isDisabled} className="submit-btn">
              submit
            </button>
          </div>
        </form>
      </div>

      <ViewUsers
        editHandler={editHandler}
        deleteHandler={deleteHandler}
        list={list}
      />
    </div>
  );
};

export default AddUsers;
