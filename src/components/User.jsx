import Stack from "react-bootstrap/Stack";

const User = ({ user }) => {
  if (!user) {
    return null;
  }

  return (
    <Stack direction="vertical" gap={2} className="mt-5">
      <h2 className="text-success">{user.name}</h2>
      <div>
        <h3 className="text-light">added blogs</h3>
        <ul>
          {user.blogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      </div>
    </Stack>
  );
};

export default User;
