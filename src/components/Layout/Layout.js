/* eslint-disable react/prop-types */
/* eslint-disable func-names */
/* eslint-disable react/destructuring-assignment */
import Fragment from '../../hoc/Fragment';
import withClass from '../../hoc/withClass';

const Layout = function (props) {
  return (
    <>
      <div>{props.header}</div>
      <div className="container">{props.menu}</div>
      <div className="container">{props.content}</div>
      <div>{props.footer}</div>
    </>
  );
};

export default withClass(Layout, 'layout');
