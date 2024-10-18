import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { saveToLocalStorage } from "../utils/localStorage";
import { STORAGE_PATH } from "../configs/localStorage";
import { ARTICLES_LIST_PATH, AUTH_PATH } from "../configs/routes";

import { store } from "../store/Store";

export const Provider = observer(() => {
  const location = useLocation();

  const { isAuthorized } = store.authStore;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  if (!isAuthorized) {
    saveToLocalStorage(STORAGE_PATH, `${location.pathname}${location.search}`);

    return <Navigate to={AUTH_PATH} />;
  }

  if (location.pathname === "/") {
    return <Navigate to={ARTICLES_LIST_PATH} />;
  }

  return <Outlet />;
});
