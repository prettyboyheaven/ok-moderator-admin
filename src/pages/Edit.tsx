import React from "react";
import { Header } from "../components/Header";
import { EditForm } from "../components/EditForm";
import styles from "../styles/page.pcss";

export const Edit = props => {
  const { game } = props.location.state;
  return (
    <section className={styles.page}>
      <Header />
      <EditForm game={game} />
    </section>
  );
};
