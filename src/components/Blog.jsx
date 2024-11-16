import { useState } from "react";
import blogService from '../services/blogs';
import PropTypes from "prop-types";

const Blog = ({ blog, likeBlog, deleteBlog, loggedUser }) => {
  const [showDetails, setShowDetails] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleShow = () => {
    setShowDetails(!showDetails);
  }

  const handleLike = async () => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    };
    likeBlog(blog.id, updatedBlog);
  }

  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteBlog(blog);
    }
  }

  return (
    <div style={blogStyle} className='blog'>
      <div className='blogHeader'>
        {blog.title} {blog.author}
        <button
          type="button"
          onClick={handleShow}
        >
          {showDetails ? "hide" : "show"}
        </button>
      </div>
      {showDetails &&
      <>
        <div className='urlDiv'>
          {blog.url}
        </div>
        <div className='likesDiv'>
          likes {blog.likes}
          <button
            type="button"
            onClick={handleLike}
          >
            like
          </button>
        </div>
        <div>
          {blog.user.name}
        </div>
        <div>
          {loggedUser.username === blog.user.username
            ? <button
                type="button"
                onClick={handleDelete}
              >
                delete
              </button>
            : ""
          }
          
        </div>
      </>
      }
    </div>
  );
}
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  loggedUser: PropTypes.object.isRequired
};

export default Blog