import PropTypes from "prop-types";

const Notification = ({ message }) => {
    if (message.text === null)
        return null;

    return (
        <div className={message.type === "success"
            ? "success" :
            message.type === "error"
            ? "error" :
            "notification"
        }
            data-testid="notification"
        >
            {message.text}
        </div>
    );
}
Notification.propTypes = {
    message: PropTypes.object.isRequired
};

export default Notification;