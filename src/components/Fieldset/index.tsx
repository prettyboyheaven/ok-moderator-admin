import React, { Dispatch, ReducerAction, SetStateAction } from "react";
import styles from "./index.pcss";

interface IProps {
  name?: string;
  value: string | number;
  placeholder: string;
  type: string;
  changeHandler: (value: string) => void;
}

export const Fieldset = ({ name, value, changeHandler, placeholder, type }: IProps) => {
  return (
    <fieldset>
      {name && <legend className={styles.title}>{name}</legend>}
      <input
        className={styles.input}
        type={type}
        value={value}
        onChange={e => {
          changeHandler(e.target.value);
        }}
        placeholder={placeholder}
      />
    </fieldset>
  );
};
