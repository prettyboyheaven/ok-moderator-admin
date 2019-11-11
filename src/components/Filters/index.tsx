import React, { FC, useContext } from "react";
import styles from "./index.pcss";
import { joinClasses } from "../../../utils/joinClasses";
import { Button } from "../Button";

export const Filters: FC = () => {
  const renderedFilters = filters.map(filter => {
    const filterClassName =
      isActive === filter
        ? joinClasses(styles.filter, styles.filterActive)
        : styles.filter;

    return (
      <li key={filter}>
        <Button
          className={filterClassName}
          content={filter}
          clickHandler={() => setActive(filter)}
        />
      </li>
    );
  });

  return (
    <nav>
      <ul className={styles.filtersList}>{renderedFilters}</ul>
    </nav>
  );
};
