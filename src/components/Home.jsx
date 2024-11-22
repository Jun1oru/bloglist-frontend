import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import { Link } from "react-router-dom";

const Home = ({ blogs }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  if (!blogs) {
    return null;
  }

  return (
    <>
      <Togglable buttonLabel="new blog">
        <BlogForm />
      </Togglable>
      {blogs.map((blog) => (
        <div key={blog.id} style={blogStyle} className="blog card bg-success">
          <div className="blogHeader px-3 pb-2">
            <Link
              to={`/blogs/${blog.id}`}
              className="text-white"
              style={{ textDecoration: "none" }}
            >
              {blog.title} {blog.author}
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default Home;
