import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
    sortBlogs(state, action) {
      state.sort(function (a, b) {
        return b.likes - a.likes;
      });
    },
    likeOf(state, action) {
      const id = action.payload;
      state.find((b) => b.id === id).likes++;
    },
    removeBlog(state, action) {
      const id = action.payload;
      return state.filter((b) => b.id !== id);
    },
    commentBlog(state, action) {
      const { id, newBlog } = action.payload;
      const comments = newBlog.comments;
      state.find((b) => b.id === id).comments = comments;
    },
  },
});

export const {
  appendBlog,
  setBlogs,
  sortBlogs,
  likeOf,
  removeBlog,
  commentBlog,
} = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
    dispatch(sortBlogs());
  };
};

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blogObject);
    dispatch(appendBlog(newBlog));
    dispatch(sortBlogs());
  };
};

export const likeBlog = (updatedBlog) => {
  const id = updatedBlog.id;

  return async (dispatch) => {
    await blogService.update(id, updatedBlog);
    dispatch(likeOf(id));
    dispatch(sortBlogs());
  };
};

export const deleteBlog = (blogObject) => {
  const id = blogObject.id;

  return async (dispatch) => {
    await blogService.remove(id);
    dispatch(removeBlog(id));
    dispatch(sortBlogs());
  };
};

export const addComment = (id, comment) => {
  return async (dispatch) => {
    const newBlog = await blogService.comment(id, comment);
    dispatch(commentBlog({ id, newBlog }));
  };
};

export default blogSlice.reducer;
