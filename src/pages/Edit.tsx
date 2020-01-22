import React, { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { EditForm } from "../components/EditForm";
import styles from "../styles/page.pcss";
import { getEndpoint } from "../../utils/getEndpoint";
import axios from "axios";

export const Edit = props => {
  const id = props.match.params.id;
  const [game, setGame] = useState(null);

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
