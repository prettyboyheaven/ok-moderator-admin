import React, { FC } from "react";
import { Icon } from "../Icon";
import { Link } from "react-router-dom";
import { CHARTS, EDIT, PAUSE, PLAY, TRASH, RULES, TRAPS, DOWNLOAD } from "../../constants/icons";
import ExternalLink from "../ExternalLink";
import { Button } from "../Button";
import styles from "./index.css";
import { Game } from "../../interfaces/game";
import { getEndpoint } from "../../../utils/getEndpoint";
import axios from "axios";

type Props = {
  game: Game;
  setFetchStatus: (status: boolean) => void;
};

enum gameMethods {
  ACTIVATE = "moderation.datasetActivate",
  PAUSE = "moderation.datasetPause",
  DELETE = "moderation.datasetDrop"
}

const ControlPanel: FC<Props> = ({ game, setFetchStatus }: Props) => {
  const { id } = game;

  // const handleActivateGame = createRequest(gameMethods.ACTIVATE);
  // const handlePauseGame = createRequest(gameMethods.PAUSE);

  const handleClick = (method: string) => {
    const endpoint = getEndpoint({
      method,
      dataset_id: id
    });

    axios.get(endpoint).then(res => {
      if (res.data.success) {
        setFetchStatus(true);
      } else {
        alert("Что-то пошло не так...");
      }
    });
  };

  const activateGameHandler = () => handleClick(gameMethods.ACTIVATE);
  const pauseGameHandler = () => handleClick(gameMethods.PAUSE);
  const deleteGameHandler = () => handleClick(gameMethods.DELETE);

  const chartsUrl = `https://charts.odkl.ru/reports?id=1330587&ModerationArenaOpStatParam1=${id}&filter=true`;

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <li>
          <Link
            to={{
              pathname: `/edit/${id}`,
              state: { game }
            }}
          >
            <Icon name={EDIT} />
          </Link>
        </li>
        <li>
          <Button className={styles.control} clickHandler={activateGameHandler}>
            <Icon name={PLAY} />
          </Button>
        </li>
        <li>
          <Button className={styles.control} clickHandler={pauseGameHandler}>
            <Icon name={PAUSE} />
          </Button>
        </li>
        <li>
          <Button className={styles.control} clickHandler={deleteGameHandler}>
            <Icon name={TRASH} />
          </Button>
        </li>
        <li>
          <Link to={{ pathname: `/rules/${id}` }}>
            <Icon name={RULES} />
          </Link>
        </li>
        <li>
          <Link
            to={{
              pathname: `/traps/${id}`,
              state: { game }
            }}
          >
            <Icon name={TRAPS} />
          </Link>
        </li>
        <li>
          <Button className={styles.control} clickHandler={() => null}>
            <Icon name={DOWNLOAD} />
          </Button>
        </li>
        <li>
          <ExternalLink url={chartsUrl}>
            <Icon name={CHARTS} />
          </ExternalLink>
        </li>
      </ul>
    </nav>
  );
};

export default ControlPanel;
