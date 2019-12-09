import React, { FC, ReactNode, MouseEvent } from "react";
import styles from "./index.pcss";
import classNames from "classnames";

interface IProps {
  className?: string;
  clickHandler: (event: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode | string;
  isAccent?: boolean;
  isAccentBackground?: boolean;
  isSubordinateBackground?: boolean;
  isAccentLightBackground?: boolean;
}

export const Button: FC<IProps> = ({
  children,
  clickHandler,
  className,
  isAccent,
  isAccentBackground,
  isSubordinateBackground,
  isAccentLightBackground
}) => {
  const buttonClassName = classNames(styles.button, className, {
    [styles.accent]: isAccent,
    [styles.accentBackground]: isAccentBackground,
    [styles.subordinateBackground]: isSubordinateBackground,
    [styles.accentLightBackground]: isAccentLightBackground
  });

  return (
    <button className={buttonClassName} onClick={clickHandler}>
      {children}
    </button>
  );
};
