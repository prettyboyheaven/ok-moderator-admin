import React, { FC, ReactNode } from "react";
import styles from "./index.pcss";

interface IProps {
  children: ReactNode;
  url: string;
}

export const ExternalLink: FC<IProps> = ({ children, url }: IProps) => {
  return (
    <a className={styles.link} href={url} target="_blank">
      {children}
    </a>
  );
};
