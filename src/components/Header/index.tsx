import React, { useState } from "react";
import { Link } from "../Link";
import { Button } from "../Button";
import { CreationMenu } from "../CreationMenu";
import styles from "./index.pcss";

export const Header = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <header className={styles.header}>
      <Link content="Разметка" withIcon={true} name="home" />
      <Button content="Создать" clickHandler={() => setOpen(!isOpen)} />
      {isOpen && <CreationMenu className={styles.headerCreationMenu} />}
    </header>
  );
};
