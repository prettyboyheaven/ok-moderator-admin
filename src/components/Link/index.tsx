import React, { FC } from "react";
import styles from "./index.pcss";

interface IProps {
  content: string;
}

export const Link: FC<IProps> = props => {
  const { content } = props;

  return (
    <a className={styles.link} href="#">
      {content}
    </a>
  );
};
