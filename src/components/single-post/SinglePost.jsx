import React, { useState, useEffect } from "react";
import "./SinglePost.scss";
import { Link, Outlet } from "react-router-dom";
import { deletePost } from "../../utils/firebase.utils";

function SinglePost({ body, title, id, userId, update, mainId }) {

  const handleDeletePost = async (mainId) => {
    await deletePost(mainId);

    window.location.reload(true);
  };

  return (
    <div className="post__container">
      <h2 className="post__container--title">{title}</h2>
      <h3 className="post__container--body">{body}</h3>
      <p className="post__container--id">
        post id : <span>{id}</span>
        {update && (
          <>
            <Link className="nav-link" to="/create-post">
              <button
                onClick={() => {
                  localStorage.setItem("title", title);
                  localStorage.setItem("body", body);
                  localStorage.setItem("id", id);
                }}
                className="update-btn"
              >
                update
              </button>
            </Link>
          </>
        )}
        {update && (
          <button
            onClick={() => handleDeletePost(mainId)}
            className="delete-btn"
          >
            delete post
          </button>
        )}
      </p>
    </div>
  );
}

export default SinglePost;
