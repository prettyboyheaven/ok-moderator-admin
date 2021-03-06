import React, { FC } from "react";
import { Icon } from "../Icon";
import { CHECKBOX, CHECKBOX_SELECTED } from "../../constants/icons";
import styles from "./index.pcss";
import { Button } from "../Button";

interface Props {
  title: string;
  clickHandler: () => void;
  isChecked: boolean;
}

export const Checkbox: FC<Props> = ({ title, clickHandler, isChecked }: Props) => {
  const icon = isChecked ? <Icon name={CHECKBOX_SELECTED} /> : <Icon name={CHECKBOX} />;

  return (
    <Button
      className={styles.checkbox}
      clickHandler={e => {
        e.preventDefault();
        clickHandler();
      }}
    >
      {icon}
      <h1 className={styles.title}>{title}</h1>
    </Button>
  );
};
