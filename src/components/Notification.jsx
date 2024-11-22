import { useSelector } from "react-redux";
import Alert from "react-bootstrap/Alert";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  if (notification.text === null) return null;

  return (
    <div className="container mt-4">
      <Alert variant={notification.type} data-testid="notification">
        {notification.text}
      </Alert>
    </div>
  );
};

export default Notification;
