import React, { FC } from "react";

interface IProps {
  content: string;
  className: string;
  clickHandler: () => void;
}

export const Button: FC<IProps> = props => {
  const { content, clickHandler, className } = props;

  return (
    <button className={className} onClick={clickHandler}>
      {content}
    </button>
  );
};
