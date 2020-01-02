import React, { FC } from "react";
import { Icon } from "../Icon";
import { Link } from "react-router-dom";
import { CHARTS, EDIT, PAUSE, PLAY, TRASH, RULES, TRAPS, DOWNLOAD } from "../../constants/icons";
import { ExternalLink } from "../ExternalLink";
import { Button } from "../Button";
import styles from "./index.pcss";
import { Game } from "../../interfaces/game";

type Props = {
  game: Game;
};

const ControlPanel: FC<Props> = ({ game }: Props) => {
  const { id } = game;

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
          <Button className={styles.control} clickHandler={() => null}>
            <Icon name={PLAY} />
          </Button>
        </li>
        <li>
          <Button className={styles.control} clickHandler={() => null}>
            <Icon name={PAUSE} />
          </Button>
        </li>
        <li>
          <Button className={styles.control} clickHandler={() => null}>
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
