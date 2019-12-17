import React, { FC } from "react";
import classNames from "classnames";
import styles from "./index.pcss";
import { Button } from "../Button";
import { Game } from "../../interfaces/game";

interface Props {
  filters: { [key: string]: string };
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  games: Game[];
}

export const Filters: FC<Props> = ({ filters, activeFilter, setActiveFilter, games }: Props) => {
  const filtersKeys = Object.keys(filters);

  const renderFilters = filtersKeys.map((filter: string) => {
    const value = filters[filter];

    const filterClassNames = classNames(styles.filter, {
      [styles.activeFilter]: filter === activeFilter
    });

    const gamesCount = games.filter((game: Game) => game.state === filter).length;

    return (
      <li className={filterClassNames} key={filter}>
        <Button clickHandler={() => setActiveFilter(filter)}>
          {value} <span className={styles.count}>{gamesCount}</span>
        </Button>
      </li>
    );
  });

  return (
    <nav>
      <ul className={styles.filtersList}>{renderFilters}</ul>
    </nav>
  );
};
