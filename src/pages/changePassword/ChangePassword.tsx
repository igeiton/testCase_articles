import { FC, MouseEvent, useCallback, useState } from "react";
import { Button, TextField } from "@mui/material";

import { changePassword } from "../../api/user";

import styles from "./ChangePassword.module.scss";

export const ChangePassword: FC = () => {
  const [isDisabled, setDisabled] = useState(false);
  const [errors, setErrors] = useState({
    old_password: "",
    password: "",
    confirmed_password: "",
  });

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmedPassword, setConfirmPassword] = useState("");

  const handleChangePassword = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      setDisabled(true);
      setErrors({
        old_password: "",
        password: "",
        confirmed_password: "",
      });

      const changePasswordData = {
        old_password: oldPassword,
        password: newPassword,
        confirmed_password: confirmedPassword,
      };

      changePassword(changePasswordData)
        .catch((errors) => setErrors(errors.message))
        .finally(() => setDisabled(false));
    },
    [oldPassword, newPassword, confirmedPassword],
  );

  return (
    <form name="change_password" className={styles.form}>
      <div>
        <TextField
          label="Old password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className={styles.input}
        />
        {errors.old_password && (
          <div className={styles.error}>{errors.old_password}</div>
        )}
      </div>

      <div>
        <TextField
          label="New password"
          value={confirmedPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={styles.input}
        />
        {errors.confirmed_password && (
          <div className={styles.error}>{errors.confirmed_password}</div>
        )}
      </div>

      <div>
        <TextField
          label="Confirmed new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className={styles.input}
        />
        {errors.password && (
          <div className={styles.error}>{errors.password}</div>
        )}
      </div>

      <Button
        variant="contained"
        onClick={handleChangePassword}
        disabled={isDisabled}
        className={styles.button}
      >
        Change password
      </Button>
    </form>
  );
};
