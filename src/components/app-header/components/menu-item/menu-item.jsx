import Style from './menu-item.module.css';
import PropTypes from 'prop-types';

export default function MenuItem(props) {
  return (
    <a href="#" className={`${Style.menuitem} p-5`}>{props.children}</a> // eslint-disable-line
  )
}

MenuItem.propTypes = {
  children: PropTypes.node.isRequired,
};