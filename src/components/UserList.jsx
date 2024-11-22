import { Link } from "react-router-dom";

import Table from "react-bootstrap/Table";

const UserList = ({ users }) => {
  if (!users) {
    return null;
  }

  return (
    <div className="mt-5 p-1 text-white">
      <h2 className="text-center">Users</h2>
      <div className="mt-3">
        <Table striped>
          <thead>
            <tr>
              <th></th>
              <th>blogs created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default UserList;
