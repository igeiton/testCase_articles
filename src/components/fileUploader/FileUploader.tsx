import { ChangeEvent, FC, useCallback } from "react";
import { Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import styles from "./FileUploader.module.scss";

type TFileUploaderProps = {
  setFile: (file: File | string) => void;
  defaultFile: File | string;
};

export const FileUploader: FC<TFileUploaderProps> = ({
  setFile,
  defaultFile,
}) => {
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.[0]) {
        setFile(e.target.files[0]);
      } else {
        setFile(defaultFile);
      }
    },
    [defaultFile, setFile],
  );

  return (
    <Button
      component="label"
      variant="outlined"
      startIcon={<CloudUploadIcon />}
      className={styles.button}
    >
      Upload files
      <input type="file" onChange={onChange} multiple hidden />
    </Button>
  );
};
