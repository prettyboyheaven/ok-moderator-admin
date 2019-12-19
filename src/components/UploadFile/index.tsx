import React, { ChangeEvent, FC } from "react";
import { Button } from "../Button";
import styles from "./index.pcss";

interface Props {
  title: string;
  id: string;
}

const UploadFile: FC<Props> = ({ title, id }: Props) => {
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    console.log(file, id);
  };

  return (
    <label className={styles.uploadFile} htmlFor="upload-file">
      <input
        className={styles.input}
        onChange={(e: ChangeEvent<HTMLInputElement>) => changeHandler(e)}
        type="file"
        id="upload-file"
      />
      <Button
        className={styles.button}
        clickHandler={e => {
          e.preventDefault();
        }}
        isAccent={true}
      >
        {title}
      </Button>
    </label>
  );
};

export default UploadFile;
