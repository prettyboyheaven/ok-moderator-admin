import React, { useState, FC } from "react";
import { Game } from "../../interfaces/game";
import { Fieldset } from "../Fieldset";
import styles from "./index.pcss";
import { Icon } from "../Icon";
import { CAMERA } from "../../constants/icons";
import { Checkbox } from "../Checkbox";

interface FormBioProps {
  name: Game["name"];
  coverPhotoUrl: Game["coverPhotoUrl"];
}

interface FormMainProps {
  playerIds: Game["playerIds"];
  premiumTag: Game["premiumTag"];
  premiumAltTag: Game["premiumAltTag"];
  penaltyTag: Game["penaltyTag"];
  quorumPercent: Game["quorumPercent"];
  penaltyAltTag: Game["penaltyAltTag"];
  minimalNumVotes: Game["minimalNumVotes"];
}

const FormBio: FC<FormBioProps> = ({ name, coverPhotoUrl }: FormBioProps) => {
  const [gameName, setName] = useState(name);
  const [gameAvatar, setGameAvatar] = useState(coverPhotoUrl);

  const image = gameAvatar ? (
    <img className={styles.avatar} src={gameAvatar} alt={gameAvatar} />
  ) : (
    <Icon name={CAMERA} />
  );

  return (
    <div className={styles.bio}>
      <h1 className={styles.title}>Об игре</h1>
      <div className={styles.avatar}>{image}</div>
      <div>
        <Fieldset
          name="Название"
          value={gameName}
          handler={setName}
          placeholder="Название игры"
        />
        <Fieldset
          name="Аватар"
          value={gameAvatar}
          handler={setGameAvatar}
          placeholder="Ссылка на картинку"
        />
      </div>
    </div>
  );
};

const FormMain: FC<FormMainProps> = ({
  playerIds,
  premiumTag,
  premiumAltTag,
  penaltyTag,
  quorumPercent,
  penaltyAltTag,
  minimalNumVotes
}: FormMainProps) => {
  const ids = playerIds.toString();
  const [gamePlayerIds, setPlayerIds] = useState(ids);
  const [gamePremiumTag, setPremiumTag] = useState(premiumTag);
  const [gamePremiumAltTag, setPremiumAltTag] = useState(premiumAltTag);
  const [gamePenaltyTag, setPenaltyTag] = useState(penaltyTag);
  const [gameQuorumPercent, setQuorumPercent] = useState(quorumPercent);
  const [gamePenaltyAltTag, setPenaltyAltTag] = useState(penaltyAltTag);
  const [gameMinimalNumVotes, setMinimalNumVotes] = useState(minimalNumVotes);

  return (
    <div>
      <h1 className={styles.title}>Основные</h1>
      <Fieldset
        name="PlayersIDs"
        value={gamePlayerIds}
        handler={setPlayerIds}
        placeholder="PlayersIDs"
      />
      <Checkbox title="isAvailableForAllUsers" />
      <div className={styles.settings}>
        <Fieldset
          name="premiumTag"
          value={gamePremiumTag}
          handler={setPremiumTag}
          placeholder="premiumTag"
        />
        <Fieldset
          name="premiumAltTag"
          value={gamePremiumAltTag}
          handler={setPremiumAltTag}
          placeholder="premiumAltTag"
        />
        <Fieldset
          name="penaltyTag"
          value={gamePenaltyTag}
          placeholder="penaltyTag"
          handler={setPenaltyTag}
        />
        <Fieldset
          name="penaltyAltTag"
          value={gamePenaltyAltTag}
          placeholder="penaltyAltTag"
          handler={setPenaltyAltTag}
        />
        <Fieldset
          name="quorumPercent"
          value={gameQuorumPercent}
          placeholder="quorumPercent"
          handler={setQuorumPercent}
        />
        <Fieldset
          name="minimalNumVotes"
          value={gameMinimalNumVotes}
          placeholder="minimalNumVotes"
          handler={setMinimalNumVotes}
        />
      </div>
    </div>
  );
};

interface IProps {
  game: Game;
}

export const EditForm = ({ game }: IProps) => {
  const { name, coverPhotoUrl, playerIds } = game;

  return (
    <form>
      <FormBio name={name} coverPhotoUrl={coverPhotoUrl} />
      <FormMain playerIds={playerIds} />
    </form>
  );
};
