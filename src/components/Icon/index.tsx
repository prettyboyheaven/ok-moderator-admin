import React, { FC } from "react";
import Home from "../../icons/home.svg";
import styles from "./index.pcss";

interface IProps {
  name: string;
}

export const Icon: FC<IProps> = ({ name }) => {
    return <Home className={ styles.icon }/>
};
