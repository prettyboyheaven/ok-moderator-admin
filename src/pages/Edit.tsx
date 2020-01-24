import React, { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { EditForm } from "../components/EditForm";
import styles from "../styles/page.css";
import { getEndpoint } from "../../utils/getEndpoint";
import axios from "axios";
import { RouteComponentProps } from "react-router";
import { Game } from "../interfaces/game";

interface Props {
  id: string;
}

export const Edit = (props: RouteComponentProps<Props>) => {
  const id = props.match.params.id;
  const [game, setGame] = useState<Game | null>(null);

  const endPoint = getEndpoint({ method: "moderation.datasetGet", dataset_id: id });

  useEffect(() => {
    axios.get(endPoint).then(res => {
      if (res.data.dataset) {
        setGame(res.data.dataset);
      } else {
        alert("Что-то пошло не так");
      }
    });
  }, []);

  if (!game) {
    return null;
  }

  return (
    <section className={styles.page}>
      <Header />
      <EditForm game={game} />
    </section>
  );
};
