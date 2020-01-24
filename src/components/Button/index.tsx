import React, { FC, ReactNode, MouseEvent } from "react";
import styles from "./index.css";
import classNames from "classnames";

interface Props {
  className?: string;
  clickHandler: (event: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode | string;
  isAccent?: boolean;
  isAccentLight?: boolean;
  isSubordinate?: boolean;
  disabled?: boolean;
}

export const Button: FC<Props> = ({
  children,
  clickHandler,
  className,
  isAccent,
  isAccentLight,
  isSubordinate,
  disabled
}: Props) => {
  const buttonClassName = classNames(styles.button, className, {
    [styles.accent]: isAccent,
    [styles.accentLight]: isAccentLight,
    [styles.subordinate]: isSubordinate
  });

  return (
    <button className={buttonClassName} onClick={clickHandler} disabled={ disabled }>
      {children}
    </button>
  );
};
