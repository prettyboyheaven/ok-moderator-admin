import React, { FC, useReducer, MouseEvent } from "react";
import { Game } from "../../interfaces/game";
import { Fieldset } from "../Fieldset";
import styles from "./index.pcss";
import { Image } from "../Image";
import { Checkbox } from "../Checkbox";
import { Footer } from "../Footer";
import { Button } from "../Button";
import { tagsToArray } from "../../../utils/transformTags";
import { ITags } from "../../types/tags";
import { Categories } from "../Categories";

interface Props {
  game: Game;
}

const init = (initialState: Game) => {
  const { labelingStrategy } = initialState;
  initialState.tags = tagsToArray(labelingStrategy.tagMap);
  return initialState;
};

type Action =
  | { type: "SET_NAME"; payload: { name: string } }
  | { type: "SET_COVER_PHOTO_URL"; payload: { coverPhotoUrl: string } }
  | { type: "SET_PLAYER_IDS"; payload: { playerIds: string } }
  | { type: "SET_AVAILABLE_FOR_ALL_USERS" }
  | { type: "SET_PREMIUM_TAG"; payload: { premiumTag: string } }
  | { type: "SET_PREMIUM_ALT_TAG"; payload: { premiumAltTag: string } }
  | { type: "SET_PENALTY_TAG"; payload: { penaltyTag: string } }
  | { type: "SET_PENALTY_ALT_TAG"; payload: { penaltyAltTag: string } }
  | { type: "SET_QUORUM_PERCENT"; payload: { quorumPercent: string } }
  | { type: "SET_MINIMAL_NUM_VOTES"; payload: { minimalNumVotes: string } }
  | { type: "SET_PRIVACY_ENABLED" }
  | { type: "SET_EXTERNAL_IMAGE_AVAILABILITY" }
  | { type: "SET_STREAMING" }
  | { type: "SET_TRAINING_ENABLED" }
  | { type: "SET_AMOUNT_OF_TRAIN_TASKS"; payload: { amountOfTrainTasks: string } }
  | { type: "SET_PERCENT_TO_PASS"; payload: { percentToPass: string } }
  | { type: "SET_MULTI_SELECT_ENABLED" }
  | { type: "SET_TAGS"; payload: { tags: ITags } }
  | { type: "SET_CATEGORY_CODE"; payload: { categoryCode: string; id: string } }
  | { type: "SET_CATEGORY_VALUE"; payload: { categoryValue: string; id: string } }
  | { type: "DELETE_CATEGORY"; payload: { id: string } }
  | { type: "ADD_CATEGORY" }
  | { type: "RESET"; payload: { game: Game } };

const reducer = (state: Game, action: Action): Game => {
  switch (action.type) {
    case "SET_NAME": {
      return { ...state, name: action.payload.name };
    }
    case "SET_COVER_PHOTO_URL": {
      return { ...state, coverPhotoUrl: action.payload.coverPhotoUrl };
    }
    case "SET_PLAYER_IDS": {
      return {
        ...state,
        playerIds: action.payload.playerIds.split(",").map((id: string) => id.trim())
      };
    }
    case "SET_AVAILABLE_FOR_ALL_USERS": {
      return { ...state, playerIds: [""] };
    }
    case "SET_PREMIUM_TAG": {
      return { ...state, premiumTag: Number(action.payload.premiumTag) };
    }
    case "SET_PREMIUM_ALT_TAG": {
      return { ...state, premiumAltTag: Number(action.payload.premiumAltTag) };
    }
    case "SET_PENALTY_TAG": {
      return { ...state, penaltyTag: Number(action.payload.penaltyTag) };
    }
    case "SET_PENALTY_ALT_TAG": {
      return { ...state, penaltyAltTag: Number(action.payload.penaltyAltTag) };
    }
    case "SET_QUORUM_PERCENT": {
      return { ...state, quorumPercent: Number(action.payload.quorumPercent) };
    }
    case "SET_MINIMAL_NUM_VOTES": {
      return { ...state, minimalNumVotes: Number(action.payload.minimalNumVotes) };
    }
    case "SET_PRIVACY_ENABLED": {
      return { ...state, checkPrivacyEnabled: !state.checkPrivacyEnabled };
    }
    case "SET_EXTERNAL_IMAGE_AVAILABILITY": {
      return {
        ...state,
        checkExternalImageAvailability: !state.checkExternalImageAvailability
      };
    }
    case "SET_STREAMING": {
      return { ...state, streaming: !state.streaming };
    }
    case "SET_TRAINING_ENABLED": {
      return { ...state, trainingEnabled: !state.trainingEnabled };
    }
    case "SET_AMOUNT_OF_TRAIN_TASKS": {
      return {
        ...state,
        amountOfTrainTasks: Number(action.payload.amountOfTrainTasks)
      };
    }
    case "SET_PERCENT_TO_PASS": {
      return { ...state, percentToPass: Number(action.payload.percentToPass) };
    }
    case "SET_MULTI_SELECT_ENABLED": {
      return { ...state, multiSelectEnabled: !state.multiSelectEnabled };
    }
    case "SET_CATEGORY_CODE": {
      const tags = { ...state.tags };
      tags[action.payload.id].categoryCode = action.payload.categoryCode;
      return { ...state, tags };
    }
    case "SET_CATEGORY_VALUE": {
      const tags = { ...state.tags };
      tags[action.payload.id].categoryValue = action.payload.categoryValue;
      return { ...state, tags };
    }
    case "DELETE_CATEGORY": {
      const tags = { ...state.tags };
      const { [action.payload.id]: category, ...withOutCategoryForDelete } = tags;
      return { ...state, tags: withOutCategoryForDelete };
    }
    case "ADD_CATEGORY": {
      const tags = { ...state.tags };
      const tagId = Object.keys(tags).length + 1;
      tags[tagId] = {
        categoryCode: "",
        categoryValue: ""
      };

      return { ...state, tags };
    }
    case "RESET": {
      return init(action.payload.game);
    }
    default:
      return state;
  }
};

export const EditForm: FC<Props> = ({ game }: Props) => {
  const [state, dispatch] = useReducer(reducer, game, init);

  const setName = (name: string) => dispatch({ type: "SET_NAME", payload: { name } });
  const setCoverPhotoUrl = (coverPhotoUrl: string) =>
    dispatch({ type: "SET_COVER_PHOTO_URL", payload: { coverPhotoUrl } });
  const setPlayerIds = (playerIds: string) => dispatch({ type: "SET_PLAYER_IDS", payload: { playerIds } });
  const setAvailableForAllUsers = () => dispatch({ type: "SET_AVAILABLE_FOR_ALL_USERS" });
  const setPremiumTag = (premiumTag: string) => dispatch({ type: "SET_PREMIUM_TAG", payload: { premiumTag } });
  const setPremiumAltTag = (premiumAltTag: string) =>
    dispatch({ type: "SET_PREMIUM_ALT_TAG", payload: { premiumAltTag } });
  const setPenaltyTag = (penaltyTag: string) => dispatch({ type: "SET_PENALTY_TAG", payload: { penaltyTag } });
  const setPenaltyAltTag = (penaltyAltTag: string) =>
    dispatch({ type: "SET_PENALTY_ALT_TAG", payload: { penaltyAltTag } });
  const setPrivacyEnabled = () => dispatch({ type: "SET_PRIVACY_ENABLED" });
  const setCheckExternalImageAvailability = () => dispatch({ type: "SET_EXTERNAL_IMAGE_AVAILABILITY" });
  const setStreaming = () => dispatch({ type: "SET_STREAMING" });
  const setTrainingEnabled = () => dispatch({ type: "SET_TRAINING_ENABLED" });
  const setQuorumPercent = (quorumPercent: string) =>
    dispatch({ type: "SET_QUORUM_PERCENT", payload: { quorumPercent } });
  const setMinimalNumVotes = (minimalNumVotes: string) =>
    dispatch({ type: "SET_MINIMAL_NUM_VOTES", payload: { minimalNumVotes } });
  const setAmountOfTrainTasks = (amountOfTrainTasks: string) =>
    dispatch({
      type: "SET_AMOUNT_OF_TRAIN_TASKS",
      payload: { amountOfTrainTasks }
    });
  const setPercentToPass = (percentToPass: string) =>
    dispatch({ type: "SET_PERCENT_TO_PASS", payload: { percentToPass } });
  const setMultiSelectEnabled = () => dispatch({ type: "SET_MULTI_SELECT_ENABLED" });
  const setCategoryCode = (categoryCode: string, id: string) =>
    dispatch({
      type: "SET_CATEGORY_CODE",
      payload: { categoryCode, id }
    });
  const setCategoryValue = (categoryValue: string, id: string) =>
    dispatch({
      type: "SET_CATEGORY_VALUE",
      payload: { categoryValue, id }
    });
  const deleteCategory = (id: string) => dispatch({ type: "DELETE_CATEGORY", payload: { id } });
  const addCategory = () => dispatch({ type: "ADD_CATEGORY" });

  const reset = () => dispatch({ type: "RESET", payload: { game } });

  const {
    name,
    // если фото отсутсвует, то поле не приходит
    // и в дев режиме реакт ругается на попытку изменения поля
    coverPhotoUrl = "",
    premiumTag = 4,
    premiumAltTag = 2,
    penaltyTag = 6,
    penaltyAltTag = 8,
    playerIds,
    quorumPercent = 85,
    minimalNumVotes = 5,
    checkPrivacyEnabled = true,
    checkExternalImageAvailability = true,
    streaming = false,
    trainingEnabled = false,
    percentToPass = 0,
    amountOfTrainTasks = 0,
    multiSelectEnabled,
    tags
  } = state;

  const ids = playerIds.toString();
  return (
    <form className={styles.form}>
      <div className={styles.bio}>
        <h1 className={styles.title}>Об игре</h1>
        <Image coverPhotoUrl={coverPhotoUrl} />
        <div className={ styles.settingsRow }>
          <Fieldset name="Название" value={name} changeHandler={setName} placeholder="Название игры" type="text" />
          <Fieldset
            name="Аватар"
            value={coverPhotoUrl}
            changeHandler={setCoverPhotoUrl}
            placeholder="Ссылка на картинку"
            type="text"
          />
        </div>
      </div>
      <div className={styles.main}>
        <h1 className={styles.title}>Основные</h1>
        <Fieldset name="PlayersIDs" value={ids} changeHandler={setPlayerIds} placeholder="PlayersIDs" type="text" />
        <Checkbox title="isAvailableForAllUsers" clickHandler={setAvailableForAllUsers} isChecked={ids === ""} />
        <div className={styles.settings}>
          <Fieldset
            name="premiumTag"
            value={premiumTag}
            changeHandler={setPremiumTag}
            placeholder="premiumTag"
            type="number"
          />
          <Fieldset
            name="premiumAltTag"
            value={premiumAltTag}
            changeHandler={setPremiumAltTag}
            placeholder="premiumAltTag"
            type="number"
          />
          <Fieldset
            name="penaltyTag"
            value={penaltyTag}
            changeHandler={setPenaltyTag}
            placeholder="penaltyTag"
            type="number"
          />
          <Fieldset
            name="penaltyAltTag"
            value={penaltyAltTag}
            changeHandler={setPenaltyAltTag}
            placeholder="penaltyAltTag"
            type="number"
          />
          <Fieldset
            name="quorumPercent"
            value={quorumPercent}
            changeHandler={setQuorumPercent}
            placeholder="quorumPercent"
            type="number"
          />
          <Fieldset
            name="minimalNumVotes"
            value={minimalNumVotes}
            changeHandler={setMinimalNumVotes}
            placeholder="minimalNumVotes"
            type="number"
          />
        </div>
      </div>
      <div className={styles.additional}>
        <h1 className={styles.title}>Дополнительные</h1>
        <Checkbox title="isCheckPrivacyEnabled" clickHandler={setPrivacyEnabled} isChecked={checkPrivacyEnabled} />
        <Checkbox
          title="isCheckExternalImageAvailability"
          clickHandler={setCheckExternalImageAvailability}
          isChecked={checkExternalImageAvailability}
        />
        <Checkbox title="isStreaming" clickHandler={setStreaming} isChecked={streaming} />
        <Checkbox title="isTrainingEnabled" clickHandler={setTrainingEnabled} isChecked={trainingEnabled} />
        <div className={styles.settings}>
          <Fieldset
            name="amountOfTrainTasks"
            value={amountOfTrainTasks}
            placeholder="amountOfTrainTasks"
            changeHandler={setAmountOfTrainTasks}
            type="number"
          />
          <Fieldset
            name="gamePercentToPass"
            value={percentToPass}
            placeholder="gamePercentToPass"
            changeHandler={setPercentToPass}
            type="number"
          />
        </div>
      </div>
      <Categories
        deleteCategory={deleteCategory}
        setCategoryCode={setCategoryCode}
        setCategoryValue={setCategoryValue}
        multiSelectEnabled={multiSelectEnabled}
        setMultiSelectEnabled={setMultiSelectEnabled}
        addCategory={addCategory}
        tags={tags}
      />
      <Footer>
        <Button
          clickHandler={(e: MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            reset();
          }}
          isSubordinate={true}
        >
          Отменить
        </Button>
        <Button
          clickHandler={(e: MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            console.log(state);
          }}
          isAccent={true}
        >
          Отправить на валидацию
        </Button>
      </Footer>
    </form>
  );
};
