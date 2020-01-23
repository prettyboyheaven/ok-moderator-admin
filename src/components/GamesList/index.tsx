import React, { FC } from "react";
import styles from "./index.pcss";
import ControlPanel from "../ControlPanel";
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
  createdMillis: string;
  lastUpdatedMillis: string;
}

interface GameProgress {
  processedRecords: string;
  totalRecords: string;
}

interface Props {
  games: Game[];
  activeFilter: string;
  setFetchStatus: (status: boolean) => void;
}

const GameName: FC<GameName> = ({ name, taskDescription }: GameName) => (
  <div className={styles.name}>
    <h1 className={styles.title}>{name}</h1>
    {/*{taskDescription && <p>{taskDescription}</p>}*/}
  </div>
);

const GameStats: FC<GameStats> = ({ priority, id, type, createdMillis, lastUpdatedMillis }: GameStats) => {
  const formatDate = (date: string) => {
    const formattedDate = new Date(Number(date));

    const result = {
      date: `${formattedDate.getDate()}.${formattedDate.getMonth()}.${formattedDate.getFullYear()}`,
      time: `${formattedDate.getHours()}:${formattedDate.getMinutes()}`,
      get fullDate() {
        return this.date + " " + this.time;
      }
    };

    return result.fullDate;
  };

  return (
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
      <p className={styles.time}>
        Создано {formatDate(createdMillis)} | Изменено {formatDate(lastUpdatedMillis)}
      </p>
    </div>
  );
};

const GameProgress: FC<GameProgress> = ({ processedRecords, totalRecords }: GameProgress) => {
  const progress = Math.floor((+processedRecords / +totalRecords) * 100) || 0;

  return (
    <div className={styles.progress}>
      <div className={styles.progressLine} style={{ width: `${progress}%` }} />
      <p>{`${progress}% (${processedRecords}/${totalRecords})`}</p>
    </div>
  );
};

export const GamesList: FC<Props> = ({ games, activeFilter, setFetchStatus }: Props) => {
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
        processedRecords,
        createdMillis,
        lastUpdatedMillis
      } = game;

      const type = labelingStrategy && labelingStrategy.type;

      return (
        <li className={styles.game} key={id}>
          <GameName name={name} taskDescription={taskDescription} />
          <Image className={styles.image} coverPhotoUrl={coverPhotoUrl} />
          <GameStats
            priority={priority}
            id={id}
            type={type}
            createdMillis={createdMillis}
            lastUpdatedMillis={lastUpdatedMillis}
          />
          <GameProgress processedRecords={processedRecords} totalRecords={totalRecords} />
          <ControlPanel game={game} setFetchStatus={setFetchStatus} />
        </li>
      );
    });

  return <ul>{renderGames}</ul>;
};
