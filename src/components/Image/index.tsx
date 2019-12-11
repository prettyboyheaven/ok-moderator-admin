import React, { FC } from "react";
import classNames from "classnames";
import { Game } from "../../interfaces/game";
import { Icon } from "../Icon";
import { CAMERA } from "../../constants/icons";
import styles from './index.pcss';

interface Props {
  className: string;
  coverPhotoUrl: Game["coverPhotoUrl"];
}

export const Image: FC<Props> = ({ coverPhotoUrl, className }: Props) => {
  const image = coverPhotoUrl ? <img className={styles.image} src={coverPhotoUrl} alt={coverPhotoUrl} /> : <Icon name={CAMERA} />;

  const imageContainerClassName = classNames(styles.imageContainer, className);

  return <div className={imageContainerClassName}>{image}</div>;
};
