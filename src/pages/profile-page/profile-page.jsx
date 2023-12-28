
import { useDispatch } from 'react-redux';
import Style from './profile-page.module.css';
import { NavLink, Outlet } from 'react-router-dom';
import { logOut } from '../../services/actions/user';
import { getCookie } from '../../components/utils/cookies';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Modal from "../../components/modal/modal";
import FeedInfo from "../../components/feed-info/feed-info";
import FeedInfoPage from "../feed-info-page/feed-info-page";

export default function ProfilePage() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handlerLogout = () => {
    const refreshToken = getCookie('refreshToken');
    dispatch(logOut(refreshToken));
  }
  const params = useParams();
  const location = useLocation();
  const background = location.state?.modal;

  
  // реализуем возможность сбежать
  const closeModal = () => {
    navigate('/profile/orders', {
      state: { modal: false }
    });
  };

  return (params.id && !background) ?
    (<FeedInfoPage />) : (
      <main className={Style.profile}>
        <nav className={Style.nav}>
          <ul className={`text text_type_main-medium mb-20 ${Style.list}`}>
            <li className={Style.list_item}>
              <NavLink to="." end
                className={({ isActive }) => `${Style.navlink} ${isActive ? Style.active : "text_color_inactive"}`}>
                Профиль
              </NavLink>
            </li>
            <li className={Style.list_item}>
              <NavLink to="/profile/orders"
                className={({ isActive }) => `${Style.navlink} ${isActive ? Style.active : "text_color_inactive"}`} >
                История заказов
              </NavLink>
            </li>
            <li className={Style.list_item}>
              <NavLink to="/login" onClick={handlerLogout} className={({ isActive }) => `${Style.navlink}
            ${isActive ? Style.active : "text_color_inactive"}`}>
                Выход
              </NavLink>
            </li>
          </ul>
          <p className={`text text_type_main-default text_color_inactive ${Style.text}`}>В этом разделе вы можете изменить свои персональные данные</p>
        </nav>
        <Outlet />
        {background && (
          <Modal closeModal={closeModal}>
            <FeedInfo />
          </Modal>
        )
        }
      </main>
    )
};
