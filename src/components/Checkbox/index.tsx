import React, { useState } from "react";
import { Icon } from "../Icon";
import { CHECKBOX, CHECKBOX_SELECTED } from "../../constants/icons";
import styles from "./index.pcss";

interface IProps {
  title: string;
}

export const Checkbox = ({ title }: IProps) => {
  const [isChecked, setCheck] = useState(false);

  const icon = isChecked ? (
    <Icon name={CHECKBOX_SELECTED} />
  ) : (
    <Icon name={CHECKBOX} />
  );

  return (
    <button
      className={styles.checkbox}
      onClick={e => {
        e.preventDefault();
        setCheck(!isChecked);
      }}
    >
      {icon}
      <h1 className={styles.title}>{title}</h1>
    </button>
  );
};
