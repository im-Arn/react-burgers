import Style from './main-page.module.css';

export default function MainPage(props) {
  return(
    <main className={Style.main}>{props.children}</main>
  )
}