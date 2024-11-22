import { useSelector, useDispatch } from "react-redux";
import { likeBlog, deleteBlog, addComment } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useState } from "react";

import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();

  const [comment, setComment] = useState("");
  const loggedUser = useSelector((state) => state.loggedUser);

  const handleLike = async () => {
    const updatedBlog = {
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    };
    try {
      dispatch(likeBlog(updatedBlog));
      dispatch(
        setNotification({
          type: "success",
          text: `liked ${blog.title} by ${blog.author}`,
        }),
      );
    } catch (exception) {
      dispatch(
        setNotification({
          type: "error",
          text: exception.response.data.error,
        }),
      );
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        dispatch(deleteBlog(blog));
        dispatch(
          setNotification({
            type: "success",
            text: `blog ${blog.title} by ${blog.author} deleted`,
          }),
        );
      } catch (exception) {
        dispatch(
          setNotification({
            type: "error",
            text: exception.response.data.error,
          }),
        );
      }
    }
  };

  const handleComment = (event) => {
    event.preventDefault();
    try {
      dispatch(addComment(blog.id, comment));
      dispatch(
        setNotification({
          type: "success",
          text: `comment ${comment} added`,
        }),
      );
      setComment("");
    } catch (exception) {
      dispatch(
        setNotification({
          type: "error",
          text: exception.response.data.error,
        }),
      );
    }
  };

  if (!blog) {
    return null;
  }

  return (
    <div className="card mt-5 p-1 bg-info text-white">
      <h2 className="text-center">
        {blog.title} {blog.author}
      </h2>
      <Stack direction="vertical" gap={3} className="mx-1 my-2">
        <div className="urlDiv">
          <a href={blog.url} className="btn btn-dark">
            {blog.url}
          </a>
        </div>
        <Stack direction="horizontal" gap={3} className="likesDiv">
          <div>{blog.likes} likes</div>
          <button
            type="button"
            onClick={handleLike}
            className="btn btn-success"
          >
            like
          </button>
        </Stack>
        <div>added by {blog.user.name}</div>
        {loggedUser.username === blog.user.username && (
          <div>
            <button
              type="button"
              onClick={handleDelete}
              className="btn btn-danger"
            >
              delete
            </button>
          </div>
        )}
        <h3 className="text-muted">comments</h3>
        <div>
          <Form onSubmit={handleComment}>
            <Form.Group>
              <Form.Label>comment:</Form.Label>
              <Stack direction="horizontal" gap={2}>
                <Form.Control
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                  placeholder="add comment"
                />
                <Button variant="primary" type="submit" size="sm">
                  add comment
                </Button>
              </Stack>
            </Form.Group>
          </Form>
        </div>
        <ul>
          {blog.comments.map((comment) => (
            <li key={comment.id}>{comment.text}</li>
          ))}
        </ul>
      </Stack>
    </div>
  );
};

export default Blog;
