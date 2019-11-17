import React, { Dispatch, SetStateAction } from "react";
import styles from "./index.pcss";

interface IProps {
  name: string;
  value: string | number;
  placeholder: string;
  handler: Dispatch<SetStateAction<string>> | Dispatch<SetStateAction<number>>;
}

export const Fieldset = ({ name, value, handler, placeholder }: IProps) => {
  const typeOfValue = typeof value === "string" ? "text" : "number";

  return (
    <fieldset>
      <legend className={styles.title}>{name}</legend>
      <input
        className={styles.input}
        type={typeOfValue}
        value={value}
        onChange={e => handler(e.target.value)}
        placeholder={placeholder}
      />
    </fieldset>
  );
};
