import React, { ChangeEvent, FC, useState } from "react";
import styles from "./index.pcss";

type Props = {
  maxLength: number;
  id: string;
  rows: number;
};

const Textarea: FC<Props> = ({ maxLength, id, rows }: Props) => {
  const [description, setDescription] = useState("");
  const changeHandler = (value: string) => setDescription(value);

  const charactersLeft = maxLength - description.length;

  return (
    <div className={styles.container}>
      <legend className={styles.title}>Описание</legend>
      <textarea
        value={description}
        className={styles.textarea}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => changeHandler(e.target.value)}
        id={id}
        rows={ rows }
        maxLength={maxLength}
        placeholder="Добавьте описание"
      />
      <span className={styles.charactersLeft}>{charactersLeft}</span>
    </div>
  );
};

export default Textarea;
