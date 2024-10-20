import { FC, MouseEvent, useCallback, useState } from "react";
import { Navigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Button, Link, TextField } from "@mui/material";

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

  const { isLoading, isAuthorized, loadTokens } = store.authStore;

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
      <TextField
        type="text"
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className={styles.input}
      />
      <TextField
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={styles.input}
      />

      <Button
        variant="contained"
        className={styles.button}
        onClick={handleLogIn}
        disabled={isLoading}
      >
        LogIn
      </Button>

      <Link href={REGISTRATION_PATH}>Register</Link>
    </form>
  );
});
