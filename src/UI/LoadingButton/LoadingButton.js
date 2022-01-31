/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable func-names */
/* eslint-disable react/button-has-type */
const LoadingButton = function (props) {
  const className = props.className || 'btn-primary';

  const buttonProps = { ...props };
  delete buttonProps.loading;

  return props.loading ? (
    <button className={`btn ${className}`} type="button" disabled>
      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
      <span className="sr-only">Loading...</span>
    </button>
  ) : (
    <button {...buttonProps} className={`btn ${className}`}>
      {props.children}
    </button>
  );
};

export default LoadingButton;
