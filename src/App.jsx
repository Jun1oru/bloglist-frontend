import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUsers } from "./reducers/usersReducer";
import { Routes, Route, useMatch } from "react-router-dom";

import Blog from "./components/Blog";
import Login from "./components/Login";
import Notification from "./components/Notification";
import UserList from "./components/UserList";
import User from "./components/User";
import Home from "./components/Home";
import Menu from "./components/Menu";
const App = () => {
  const dispatch = useDispatch();

  const blogs = useSelector((state) => state.blogs);
  const loggedUser = useSelector((state) => state.loggedUser);
  const users = useSelector((state) => state.users);

  const matchUser = useMatch("/users/:id");
  const userView = matchUser
    ? users.find((user) => user.id === matchUser.params.id)
    : null;

  const matchBlog = useMatch("/blogs/:id");
  const blogView = matchBlog
    ? blogs.find((blog) => blog.id === matchBlog.params.id)
    : null;

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
  }, []);

  return (
    <div className="App min-vh-100 d-flex justify-content-center bg-dark text-light">
      <div className="mt-4">
        {loggedUser === null ? (
          <>
            <div>
              <h2 data-testid="loginHeader" className="text-center">
                Log in to application
              </h2>
            </div>
            <Notification />
            <div className="mt-4">
              <Login />
            </div>
          </>
        ) : (
          <>
            <Menu />

            <h2 className="text-center mt-5">blog app</h2>

            <Notification />

            <Routes>
              <Route path="/" element={<Home blogs={blogs} />} />
              <Route path="/blogs/:id" element={<Blog blog={blogView} />} />
              <Route path="/users" element={<UserList users={users} />} />
              <Route path="/users/:id" element={<User user={userView} />} />
            </Routes>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
