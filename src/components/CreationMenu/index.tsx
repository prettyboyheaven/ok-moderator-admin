import React, { FC } from "react";
import styles from "./index.pcss";
import { joinClasses } from "../../../utils/joinClasses";

interface IProps {
  className: string;
}

export const CreationMenu: FC<IProps> = props => {
  const { className } = props;

  return (
    <menu className={joinClasses(styles.creationMenu, className)}>
      <p>игру</p>
      <p>новость</p>
    </menu>
  );
};
