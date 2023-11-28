import Style from './menu-item.module.css';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

export default function MenuItem(props) {
  return (
    <NavLink to={props.to} className={`${Style.menuitem} p-5`}>{props.children}</NavLink> // eslint-disable-line
  )
}

MenuItem.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
};
