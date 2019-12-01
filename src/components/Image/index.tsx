import React, { FC } from "react";
import { Game } from "../../interfaces/game";
import { Icon } from "../Icon";
import { CAMERA } from "../../constants/icons";

interface IProps {
  className: string;
  coverPhotoUrl: Game["coverPhotoUrl"];
}

export const Image: FC<IProps> = ({ coverPhotoUrl, className }: IProps) => {
  const image = coverPhotoUrl ? <img src={coverPhotoUrl} alt={coverPhotoUrl} /> : <Icon name={CAMERA} />;

  return <div className={className}>{image}</div>;
};
