import React, { FC } from "react";
import classNames from "classnames";
import styles from "./index.pcss";
import { Button } from "../Button";

interface IProps {
  filters: { [key: string]: string };
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

export const Filters: FC<IProps> = ({
  filters,
  activeFilter,
  setActiveFilter
}: IProps) => {
  const filtersKeys = Object.keys(filters);

  const renderFilters = filtersKeys.map((filter: string) => {
    const value = filters[filter];

    const filterClassNames = classNames(styles.filter, {
      [styles.activeFilter]: filter === activeFilter
    });

    return (
      <li className={filterClassNames} key={filter}>
        <Button clickHandler={() => setActiveFilter(filter)}>{value}</Button>
      </li>
    );
  });

  return (
    <nav>
      <ul className={styles.filtersList}>{renderFilters}</ul>
    </nav>
  );
};
