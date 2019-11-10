import React, { FC } from "react";

interface IProps {
  content: string;
  className?: string;
  clickHandler: () => void;
}

export const Button: FC<IProps> = ({ content, clickHandler, className }) => {
  return (
    <button className={className} onClick={clickHandler}>
      {content}
    </button>
  );
};
