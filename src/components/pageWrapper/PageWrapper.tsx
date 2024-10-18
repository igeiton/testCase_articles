import { FC } from "react";
import { NavLink, Outlet } from "react-router-dom";

import {
  ARTICLES_LIST_PATH,
  AUTH_PATH,
  CHANGE_PASSWORD_PATH,
} from "../../configs/routes";

import { store } from "../../store/Store";

import styles from "./PageWrapper.module.scss";

export const PageWrapper: FC = () => {
  const { logOut } = store.authStore;

  return (
    <div className={styles.wrapper}>
      <header className={styles.wrapper__header}>
        <NavLink to={ARTICLES_LIST_PATH}>Articles</NavLink>
        <NavLink to={CHANGE_PASSWORD_PATH}>Change Password</NavLink>
        <NavLink to={AUTH_PATH} onClick={logOut}>
          LogOut
        </NavLink>
      </header>

      <div className={styles.wrapper__outlet}>
        <Outlet />
      </div>
    </div>
  );
};
