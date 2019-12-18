import React, { useState } from "react";
import { Button } from "../Button";
import { CreationMenu } from "../CreationMenu";
import styles from "./index.pcss";
import { Link } from "react-router-dom";
import { Icon } from "../Icon";
import { HOME, TRIANGLE_CLOSED, TRIANGLE_OPENED } from "../../constants/icons";

export const Header = () => {
  const [isOpen, setOpen] = useState(false);

  const triangleIconName = isOpen ? TRIANGLE_OPENED : TRIANGLE_CLOSED;

  return (
    <header className={styles.header}>
      <Link className={styles.homeLink} to={"/"}>
        <Icon name={HOME} /> <span>Разметка</span>
      </Link>
      <Button className={styles.creationButton} clickHandler={() => setOpen(!isOpen)}>
        <span>Создать</span> <Icon name={triangleIconName} />
      </Button>
      {isOpen && <CreationMenu className={styles.creationMenu} />}
    </header>
  );
};
