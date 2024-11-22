import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../reducers/loggedUserReducer";
import { setNotification } from "../reducers/notificationReducer";

const Logout = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.loggedUser);

  const handleLogout = () => {
    try {
      dispatch(logoutUser());
      dispatch(
        setNotification({
          type: "success",
          text: "Logged out!",
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

  return (
    <div className="text-white ps-1">
      {user.name} logged in
      <button type="submit" onClick={handleLogout} className="btn btn-success">
        logout
      </button>
    </div>
  );
};

export default Logout;
