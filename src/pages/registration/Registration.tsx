import { FC, MouseEvent, useCallback, useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

import {
  loadFromLocalStorage,
  removeFromLocalStorage,
} from "../../utils/localStorage";
import { STORAGE_PATH } from "../../configs/localStorage";
import { AUTH_PATH } from "../../configs/routes";

import { registration } from "../../api/reg";
import { store } from "../../store/Store";

import styles from "./Registration.module.scss";

export const Registration: FC = observer(() => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [first_name, setFirstName] = useState<string>("");
  const [last_name, setLastName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const { isAuthorized } = store.authStore;

  const handleReg = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      registration({ email, first_name, last_name, password, username }).then(
        () => navigate(AUTH_PATH),
      );
    },
    [email, first_name, last_name, password, username, navigate],
  );

  const storagePath = loadFromLocalStorage(STORAGE_PATH);

  if (isAuthorized) {
    removeFromLocalStorage(STORAGE_PATH);
    return <Navigate to={storagePath || "/"} replace />;
  }

  return (
    <form className={styles.form}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={styles.input}
      />
      <input
        type="firstName"
        value={first_name}
        onChange={(e) => setFirstName(e.target.value)}
        className={styles.input}
      />
      <input
        type="lastName"
        value={last_name}
        onChange={(e) => setLastName(e.target.value)}
        className={styles.input}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={styles.input}
      />
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className={styles.input}
      />

      <button className={styles.btn} onClick={handleReg}>
        Register
      </button>

      <NavLink to={AUTH_PATH}>LogIn</NavLink>
    </form>
  );
});
