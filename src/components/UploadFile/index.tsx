import React, { ChangeEvent, FC } from "react";
import { Button } from "../Button";
import styles from "./index.pcss";
import { getEndpoint } from "../../../utils/getEndpoint";
import axios from "axios";

interface Props {
  title: string;
  id: string;
}

const UploadFile: FC<Props> = ({ title, id }: Props) => {
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (!file) {
      return null;
    }

    const upload = () =>
      axios
        .get(getEndpoint({ method: "moderation.datasetGetUploadUrl" }))
        .then(res => res.data.url)
        .then(url => {
          const fileId = url.match(/id=([^&]+)/)[1];
          const formData = new FormData();
          formData.append("myFile", file);
          axios
            .post(url, formData, {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            })
            .then(() => {
              axios.get(getEndpoint({ method: "moderation.datasetAddRecordsFile", dataset_id: id, file_id: fileId }));
            });
        });

    return upload();
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
