import React, { FC, ReactNode } from "react";
import styles from "./index.css";

interface Props {
  children: ReactNode;
}

export const Footer: FC<Props> = ({ children }: Props) => <footer className={styles.footer}>{children}</footer>;
