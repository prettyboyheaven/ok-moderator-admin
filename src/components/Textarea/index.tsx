import React, { ChangeEvent, FC, useState } from "react";
import styles from "./index.pcss";

type Props = {
  maxLength: number;
  id: string;
  rows: number;
  value: string;
  blurHandler: (value: string) => void;
};

const Textarea: FC<Props> = ({ maxLength, id, rows, value, blurHandler }: Props) => {
  const [description, setDescription] = useState(value);
  const charactersLeft = maxLength - description.length;

  return (
    <div className={styles.container}>
      <legend className={styles.title}>Описание</legend>
      <textarea
        onBlur={ () => blurHandler(description) }
        value={description}
        className={styles.textarea}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
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
