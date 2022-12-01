import React, { useState, useContext } from "react";
import "./CreatePost.scss";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../utils/firebase.utils";
import { FormControl, TextField, TextareaAutosize } from "@mui/material";
import Button from "../button/Button";
import { UserContext } from "../../context/User.context";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreatePost = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const initialValues = {
    title: localStorage.getItem("title") || "",
    body: localStorage.getItem("body") || "",
    id: localStorage.getItem("id") || "",
  };
  const [values, setValues] = useState(initialValues);

  const inputHandler = (e) => {
    const { value, name } = e.target;
    setValues((prev) => {
      return {
        ...prev,
        [name]: value,
        userId: currentUser?.uid,
        email: currentUser?.email,
      };
    });
  };
  const handleSubmit1 = async (e) => {
    e.preventDefault();
    try {
      if (values?.body && values?.id && values?.title) {
        await addDoc(collection(db, "posts"), {
          created: Timestamp.now(),
          ...values,
        });
        setValues({ ...initialValues });
        toast.success("🦄 Post is successfully created", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,

          theme: "colored",
        });
        localStorage.removeItem("title");
        localStorage.removeItem("body");
        localStorage.removeItem("id");
      } else {
        toast.error("all fields are necessary", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,

          theme: "colored",
        });
      }
    } catch (err) {
      alert(err);
    }
  };
  return (
    <div>
      <div className="create__post">
        <form onSubmit={handleSubmit1} className="create__post--form">
          <FormControl>
            <label htmlFor="title">title</label>
            <TextField
              id="title"
              variant="outlined"
              name="title"
              value={values?.title}
              onChange={inputHandler}
            />
          </FormControl>
          <FormControl>
            <label htmlFor="id">id</label>
            <TextField
              id="id"
              variant="outlined"
              name="id"
              value={values?.id}
              onChange={inputHandler}
            />
          </FormControl>
          <FormControl>
            <label htmlFor="body">description</label>
            <TextareaAutosize
              minRows={5}
              id="body"
              placeholder="enter description for post"
              style={{ width: 200 }}
              name="body"
              value={values?.body}
              onChange={inputHandler}
            />
          </FormControl>
          <Button type="button" buttonType="google" onClick={handleSubmit1}>
            Create Post
          </Button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreatePost;
