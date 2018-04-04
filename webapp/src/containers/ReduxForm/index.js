import React from "react";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form";

let ReduxForm = props => {
  const { handleSubmit, children, className } = props;
  return (
    <form className={className} onSubmit={handleSubmit}>
      {children}
    </form>
  );
};

ReduxForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

ReduxForm = reduxForm({
  form: "reduxForm"
})(ReduxForm);

export default ReduxForm;
