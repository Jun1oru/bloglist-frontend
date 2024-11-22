import { useState, cloneElement } from "react";
import PropTypes from "prop-types";

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div className="text-center mt-3 mb-3">
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility} className="btn btn-primary">
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible}>
        {cloneElement(props.children, { toggleVisibility })}
        <button onClick={toggleVisibility} className="mt-3 btn btn-danger">
          cancel
        </button>
      </div>
    </div>
  );
};
Togglable.displayName = "Togglable";
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
