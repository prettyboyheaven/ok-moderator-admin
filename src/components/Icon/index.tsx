import React, { FC } from "react";
import Home from "../../icons/home.svg";
import Priority from "../../icons/priority.svg";
import Id from "../../icons/id.svg";
import Type from "../../icons/type.svg";
import Edit from "../../icons/edit.svg";
import Charts from "../../icons/charts.svg";
import Play from "../../icons/play.svg";
import Pause from "../../icons/pause.svg";
import Trash from "../../icons/trash.svg";
import Rules from "../../icons/rules.svg";
import Traps from "../../icons/traps.svg";
import Download from "../../icons/download.svg";
import TriangleClosed from "../../icons/triangleClosed.svg";
import TriangleOpened from "../../icons/TriangleOpened.svg";
import Camera from "../../icons/Camera.svg";
import CheckboxSelected from "../../icons/CheckboxSelected.svg";
import Checkbox from "../../icons/Checkbox.svg";
import Plus from "../../icons/Plus.svg";
import Refresh from "../../icons/refresh.svg";
import {
  HOME,
  PRIORITY,
  ID,
  TYPE,
  EDIT,
  CHARTS,
  PLAY,
  PAUSE,
  TRASH,
  RULES,
  TRAPS,
  DOWNLOAD,
  TRIANGLE_CLOSED,
  TRIANGLE_OPENED,
  CAMERA,
  CHECKBOX,
  CHECKBOX_SELECTED,
  PLUS,
  REFRESH
} from "../../constants/icons";
import styles from "./index.pcss";

interface Props {
  name: string;
}

export const Icon: FC<Props> = ({ name }: Props) => {
  switch (name) {
    case HOME: {
      return <Home className={styles.iconDarkest} />;
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
      return <Edit />;
    }
    case CHARTS: {
      return <Charts className={styles.icon} />;
    }
    case PLAY: {
      return <Play className={styles.icon} />;
    }
    case PAUSE: {
      return <Pause className={styles.icon} />;
    }
    case TRASH: {
      return <Trash className={styles.icon} />;
    }
    case RULES: {
      return <Rules className={styles.icon} />;
    }
    case TRAPS: {
      return <Traps className={styles.icon} />;
    }
    case DOWNLOAD: {
      return <Download className={styles.icon} />;
    }
    case TRIANGLE_CLOSED: {
      return <TriangleClosed />;
    }
    case TRIANGLE_OPENED: {
      return <TriangleOpened />;
    }
    case CAMERA: {
      return <Camera />;
    }
    case CHECKBOX_SELECTED: {
      return <CheckboxSelected />;
    }
    case CHECKBOX: {
      return <Checkbox />;
    }
    case PLUS: {
      return <Plus />;
    }
    case REFRESH: {
      return <Refresh />;
    }
    default: {
      return null;
    }
  }
};
