import React, {FC} from "react";
import styles from "./index.pcss";
import { ControlPanel } from "../ControlPanel";
import { Icon } from "../Icon";
import { PRIORITY, ID, TYPE } from "../../constants/icons";
import { Game } from "../../interfaces/game";
import { Image } from "../Image";

interface GameName {
  name: string;
  taskDescription: string;
}

interface GameStats {
  priority: string;
  id: string;
  type?: string;
}

interface GameProgress {
  processedRecords: string;
  totalRecords: string;
}

interface Props {
  games: Game[];
  activeFilter: string;
}

const GameName: FC<GameName> = ({ name, taskDescription }: GameName) => (
  <div className={styles.name}>
    <h1 className={styles.title}>{name}</h1>
    {taskDescription && <p>{taskDescription}</p>}
  </div>
);

const GameStats: FC<GameStats> = ({ priority, id, type }: GameStats) => (
  <div className={styles.stats}>
    <p className={styles.description}>
      <Icon name={PRIORITY} />
      <span>{priority}</span>
    </p>
    <p className={styles.description}>
      <Icon name={ID} />
      <span>{id}</span>
    </p>
    <p className={styles.description}>
      <Icon name={TYPE} />
      <span>{type}</span>
    </p>
  </div>
);

const GameProgress: FC<GameProgress> = ({ processedRecords, totalRecords }: GameProgress) => {
  const progress = Math.floor((+processedRecords / +totalRecords) * 100) || 0;

  return (
    <div className={styles.progress}>
      <div className={styles.progressLine} style={{ width: `${progress}%` }} />
      <p>{`${progress}% (${processedRecords}/${totalRecords})`}</p>
    </div>
  );
};

export const GamesList: FC<Props> = ({ games, activeFilter }: Props) => {
  if (!games.length) {
    return null;
  }

  const renderGames = games
    .filter((game: Game) => game.state === activeFilter)
    .map((game: Game) => {
      const {
        coverPhotoUrl,
        name,
        taskDescription,
        priority,
        id,
        labelingStrategy,
        totalRecords,
        processedRecords
      } = game;

      const type = labelingStrategy && labelingStrategy.type;

      return (
        <li className={styles.game} key={id}>
          <GameName name={name} taskDescription={taskDescription} />
          <Image className={styles.image} coverPhotoUrl={coverPhotoUrl} />
          <GameStats priority={priority} id={id} type={type} />
          <GameProgress processedRecords={processedRecords} totalRecords={totalRecords} />
          <ControlPanel game={game} />
        </li>
      );
    });

  return <ul>{renderGames}</ul>;
};
