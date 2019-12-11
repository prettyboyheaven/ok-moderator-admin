import React, { FC, ReactNode } from "react";
import styles from "./index.pcss";

interface Props {
  children: ReactNode;
  url: string;
}

export const ExternalLink: FC<Props> = ({ children, url }: Props) => {
  return (
    <a className={styles.link} href={url} target="_blank">
      {children}
    </a>
  );
};
