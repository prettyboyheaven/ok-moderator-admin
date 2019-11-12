import React, { FC } from "react";
import Home from "../../icons/home.svg";
import Priority from "../../icons/priority.svg";
import Id from "../../icons/id.svg";
import Type from "../../icons/type.svg";
import Edit from "../../icons/edit.svg";
import Charts from "../../icons/charts.svg";
import { HOME, PRIORITY, ID, TYPE, EDIT, CHARTS } from "../../constants/icons";
import styles from "./index.pcss";

interface IProps {
  name: string;
}

export const Icon: FC<IProps> = ({ name }) => {
  switch (name) {
    case HOME: {
      return <Home className={styles.icon} />;
    }
    case PRIORITY: {
      return <Priority className={styles.icon} />;
    }
    case ID: {
      return <Id className={styles.icon} />;
    }
    case TYPE: {
      return <Type className={styles.icon} />;
    }
    case EDIT: {
      return <Edit className={styles.icon} />;
    }
    case CHARTS: {
      return <Charts className={styles.icon} />;
    }
    default: {
      return null;
    }
  }
};
