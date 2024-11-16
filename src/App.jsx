import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState({
    text: null,
    type: "notification",
  });
  const blogFormRef = useRef();

  useEffect(() => {
    async function fetchData() {
      const result = await blogService.getAll();
      setBlogs(result);
    }

    fetchData();
  }, [])

  const sortedBlogs = blogs.sort(function (a, b) { return b.likes - a.likes; });

  const addBlog = async (blogObject) => {
    try {
      const result = await blogService.create(blogObject);
      setBlogs(blogs.concat(result));
      handleNotificationMsg({
        text: `a new blog ${result.title} by ${result.author} added`,
        type: "success"
      });
      blogFormRef.current.toggleVisibility();
    } catch (exception) {
      handleNotificationMsg({
        text: exception.response.data.error,
        type: "error"
      });
    }
  }

  const likeBlog = async (id, blogObject) => {
    try {
      const result = await blogService.update(id, blogObject);
      const updatedBlogs = blogs.map(blog =>
        blog.id === id ? { ...blog, ...result } : blog
      );
      setBlogs(updatedBlogs);
      handleNotificationMsg({
        text: `liked ${result.title} by ${result.author}`,
        type: "success"
      });
    } catch (exception) {
      handleNotificationMsg({
        text: exception.response.data.error,
        type: "error"
      });
    }
  }

  const deleteBlog = async (blogObject) => {
    try {
      await blogService.remove(blogObject.id);
      const updatedBlogs = blogs.filter(blog => blog.id !== blogObject.id);
      setBlogs(updatedBlogs);
      handleNotificationMsg({
        text: `blog ${blogObject.title} by ${blogObject.author} deleted`,
        type: "success"
      });
    } catch (exception) {
      handleNotificationMsg({
        text: exception.response.data.error,
        type: "error"
      });
    }
  }

  const handleLogout = () => {
    try {
      window.localStorage.removeItem('loggedBlogappUser');
      blogService.setToken(null);
      setUser(null);
      handleNotificationMsg({
        text: `Logged out!`,
        type: 'success',
      });
    } catch (exception) {
      console.log(exception);
    }
    
  }

  const handleNotificationMsg = (newMsg) => {
    setMessage(message => ({
      ...message,
      ...newMsg
    }));

    setTimeout(() => {
      const resetMsg = {
        text: null,
        type: "notification",
      };
      setMessage(message => ({
        ...message,
        ...resetMsg
      }));
    }, 5000);
  }

  return (
    <div>
      
      {user === null ?
        <>
          <h2
            data-testid="loginHeader"
          >
            Log in to application
          </h2>
          <Notification message={message} />
          <Login
            setUser={setUser}
            handleNotificationMsg={handleNotificationMsg}
          />
        </> :
        <>
          <h2>blogs</h2>

          <Notification message={message} />

          <div
            data-testid="loggedDiv"
          >
            {user.name} logged in
            <button
              type="submit"
              onClick={handleLogout}
            >
              logout
            </button>
          </div>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm
              createBlog={addBlog}
            />
          </Togglable>
          
          {sortedBlogs.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              likeBlog={likeBlog}
              deleteBlog={deleteBlog}
              loggedUser={user}
            />
          )}
        </>
      }
    </div>
  )
}

export default App