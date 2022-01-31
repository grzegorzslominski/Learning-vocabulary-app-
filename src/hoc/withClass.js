/* eslint-disable func-names */
/* eslint-disable react/jsx-props-no-spreading */
const withClass = (WrappedComponent, className) => {
  return function (props) {
    return (
      <div className={className}>
        <WrappedComponent {...props} />
      </div>
    );
  };
};

export default withClass;
