import React, { FC, ReactNode } from "react";
import styles from "./index.pcss";

interface IProps {
  children: ReactNode;
}

export const Footer: FC<IProps> = ({ children }) => (
  <footer className={styles.footer}>{children}</footer>
);
