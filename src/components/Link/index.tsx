import React, { FC } from "react";
import styles from "./index.pcss";

type PropsWithoutIcon = {
  content: string;
  withIcon: false;
};

type PropsWithIcon = {
  withIcon: true;
  name: string;
  content: string;
};

type IProps = PropsWithoutIcon | PropsWithIcon;

export const Link: FC<IProps> = props => {
  const { withIcon, content } = props;

  if (withIcon) {
    const { name } = props;
  }

  return (
    <a className={styles.link} href="#">
      {content}
    </a>
  );
};
