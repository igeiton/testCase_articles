import { FC } from "react";
import { Outlet } from "react-router-dom";

import {
  ARTICLES_LIST_PATH,
  AUTH_PATH,
  CHANGE_PASSWORD_PATH,
} from "../../configs/routes";
import { Link } from "@mui/material";

import { store } from "../../store/Store";

import styles from "./PageWrapper.module.scss";

export const PageWrapper: FC = () => {
  const { logOut } = store.authStore;

  return (
    <div className={styles.wrapper}>
      <header className={styles.wrapper__header}>
        <Link href={ARTICLES_LIST_PATH} color="inherit">
          Articles
        </Link>

        <Link href={CHANGE_PASSWORD_PATH} color="inherit">
          Change Password
        </Link>

        <Link href={AUTH_PATH} onClick={logOut} color="inherit">
          LogOut
        </Link>
      </header>

      <div className={styles.wrapper__outlet}>
        <Outlet />
      </div>
    </div>
  );
};
