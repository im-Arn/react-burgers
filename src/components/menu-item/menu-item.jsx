import Style from './menu-item.module.css';

function MenuItem(props) {
  return (
    <a href="#" className={`${Style.menuitem} p-5`}>{props.children}</a>
  )
}

export default MenuItem;