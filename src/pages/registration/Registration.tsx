import { FC, MouseEvent, useCallback, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Button, Link, TextField } from "@mui/material";

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

  const [isLoading, setLoading] = useState(false);

  const [email, setEmail] = useState<string>("");
  const [first_name, setFirstName] = useState<string>("");
  const [last_name, setLastName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const { isAuthorized } = store.authStore;

  const handleReg = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setLoading(true);

      registration({ email, first_name, last_name, password, username })
        .then(() => navigate(AUTH_PATH))
        .finally(() => setLoading(false));
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
      <TextField
        type="email"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={styles.input}
      />
      <TextField
        type="firstName"
        label="First Name"
        value={first_name}
        onChange={(e) => setFirstName(e.target.value)}
        className={styles.input}
      />
      <TextField
        type="lastName"
        label="Last Name"
        value={last_name}
        onChange={(e) => setLastName(e.target.value)}
        className={styles.input}
      />
      <TextField
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={styles.input}
      />
      <TextField
        type="text"
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className={styles.input}
      />

      <Button
        variant="contained"
        className={styles.button}
        onClick={handleReg}
        disabled={isLoading}
      >
        Register
      </Button>

      <Link href={AUTH_PATH}>LogIn</Link>
    </form>
  );
});
