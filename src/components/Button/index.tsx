import React, { FC, ReactNode } from "react";
import styles from "./index.pcss";
import classNames from "classnames";

interface IProps {
  className?: string;
  clickHandler: () => void;
  children: ReactNode | string;
  isAccent?: boolean;
}

export const Button: FC<IProps> = ({
  children,
  clickHandler,
  className,
  isAccent
}) => {
  const buttonClassName = classNames(styles.button, className, {
    [styles.buttonAccent]: isAccent
  });

  return (
    <button className={buttonClassName} onClick={clickHandler}>
      {children}
    </button>
  );
};
