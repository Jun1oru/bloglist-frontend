import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const BlogForm = (props) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();
    try {
      dispatch(createBlog({ title, author, url }));
      dispatch(
        setNotification({
          type: "success",
          text: `a new blog ${title} by ${author} added`,
        }),
      );
      setTitle("");
      setAuthor("");
      setUrl("");
      props.toggleVisibility();
    } catch (exception) {
      dispatch(
        setNotification({
          type: "error",
          text: exception.response.data.error,
        }),
      );
    }
  };

  return (
    <div>
      <h2>create new</h2>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control
            data-testid="inputTitle"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="input title"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>author:</Form.Label>
          <Form.Control
            data-testid="inputAuthor"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            placeholder="input author"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>url:</Form.Label>
          <Form.Control
            data-testid="inputUrl"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="input url"
          />
        </Form.Group>
        <Button variant="success" type="submit" className="mt-3">
          create
        </Button>
      </Form>
    </div>
  );
};

export default BlogForm;
