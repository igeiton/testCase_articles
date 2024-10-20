import { FC } from "react";
import AutorenewIcon from "@mui/icons-material/Autorenew";

import styles from "./Loading.module.scss";

export const Loading: FC = () => (
  <div className={styles.loading_wrapper}>
    <AutorenewIcon />
  </div>
);
