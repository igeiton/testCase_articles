import { FC, MouseEvent, useCallback, useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import { observer } from "mobx-react-lite";

import {
  loadFromLocalStorage,
  removeFromLocalStorage,
} from "../../utils/localStorage";
import { STORAGE_PATH } from "../../configs/localStorage";
import { REGISTRATION_PATH } from "../../configs/routes";

import { store } from "../../store/Store";

import styles from "./Auth.module.scss";

export const Auth: FC = observer(() => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { isAuthorized, loadTokens } = store.authStore;

  const handleLogIn = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      loadTokens({ username, password });
    },
    [username, password, loadTokens],
  );

  const storagePath = loadFromLocalStorage(STORAGE_PATH);

  if (isAuthorized) {
    removeFromLocalStorage(STORAGE_PATH);
    return <Navigate to={storagePath || "/"} replace />;
  }

  return (
    <form className={styles.form}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className={styles.input}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={styles.input}
      />

      <button className={styles.btn} onClick={handleLogIn}>
        LogIn
      </button>

      <NavLink to={REGISTRATION_PATH}>register</NavLink>
    </form>
  );
});
