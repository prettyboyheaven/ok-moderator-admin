import React, { FC, useState, useReducer, useEffect } from "react";
import classNames from "classnames";
import { Trap as TrapType } from "../../types/trap";
import styles from "./index.pcss";
import { Fieldset } from "../Fieldset";
import Textarea from "../Textarea";
import { LabelingStrategy } from "../../types/labelingStrategy";
import { Checkbox } from "../Checkbox";
import { Button } from "../Button";
import { Icon } from "../Icon";
import { CROSS, EYE, TRASH } from "../../constants/icons";
import { getEndpoint } from "../../../utils/getEndpoint";

interface Props {
  trap: TrapType;
  labelingStrategy: LabelingStrategy;
  reFetch: () => void;
}

enum TrapTransforms {
  TOGGLE_TAG = "TOGGLE_TAG",
  RESET_TAGS = "RESET_TAGS",
  CHANGE_DESCRIPTION = "CHANGE_DESCRIPTION"
}

const Trap: FC<Props> = ({ trap, labelingStrategy, reFetch }: Props) => {
  const [previewStatus, setPreviewStatus] = useState(false);
  const [isLoading, setLoadingStatus] = useState(false);

  const {
    id,
    record: { selectedTags, url, datasetId, description }
  } = trap;

  const endpoint = (trap: TrapType) =>
    getEndpoint({
      method: "moderation.datasetTrapsModifyList",
      traps_request: encodeURIComponent(
        JSON.stringify({
          dataset_id: datasetId,
          traps: [trap]
        })
      )
    });

  const transformTrap = (type: string, value: string) => {
    switch (type) {
      case TrapTransforms.TOGGLE_TAG: {
        const record = { ...trap.record };
        record.selectedTags = trap.record.selectedTags.includes(value)
          ? trap.record.selectedTags.filter((selectedTag: string) => selectedTag !== value)
          : [...trap.record.selectedTags, value];
        return { ...trap, record };
      }
      case TrapTransforms.RESET_TAGS: {
        const record = { ...trap.record };
        record.selectedTags = [];
        return { ...trap, record };
      }
      case TrapTransforms.CHANGE_DESCRIPTION: {
        const record = { ...trap.record };
        record.description = value.trim();
        return { ...trap, record };
      }
      default:
        return trap;
    }
  };

  const handleModifyTrap = (type: TrapTransforms, value: string) => {
    setLoadingStatus(true);
    const trap = transformTrap(type, value);
    return fetch(endpoint(trap), { method: "POST" }).then(res => {
      if (res.ok) {
        reFetch()
      }
    });
  };

  // const modifyTrap = () => {
  //   fetch(endpoint)
  //       .then(res => console.log(res))
  //       .catch(e => alert(`Ошибка при изменении ловушки: ${e}`))
  // };

  const renderTags = () => {
    const { tagMap } = labelingStrategy;
    const keys = Object.keys(tagMap);
    return keys.map((tag: string) => {
      const isSelected = selectedTags.includes(tag);
      const text = tag + " | " + tagMap[tag];
      return (
        <li key={tag}>
          <Checkbox
            title={text}
            clickHandler={() => {
              handleModifyTrap(TrapTransforms.TOGGLE_TAG, tag);
              // handleModifyTrap();
            }}
            isChecked={isSelected}
          />
        </li>
      );
    });
  };

  const trapClass = classNames(styles.trap, { [styles.trapShowPreview]: previewStatus });
  const isResetTagsButtonDisabled = !selectedTags.length;

  return (
    <div className={trapClass}>
      <div className={styles.settings}>
        <Fieldset name="ID ловушки" value={id} disabled={true} withCopyButton={true} />
        <Fieldset name="URL" value={url} disabled={true} withCopyButton={true} />
        <Textarea
          value={description}
          maxLength={100}
          id={id}
          rows={4}
          blurHandler={(value: string) => {
            handleModifyTrap(TrapTransforms.CHANGE_DESCRIPTION, value);
          }}
        />
        <div>
          <h1 className={styles.title}>
            Категории ловушки{" "}
            <Button
              clickHandler={() => handleModifyTrap(TrapTransforms.RESET_TAGS, "")}
              disabled={isResetTagsButtonDisabled || isLoading}
            >
              <Icon name={TRASH} />
            </Button>
          </h1>
          <ul>{renderTags()}</ul>
          <div className={styles.controls}>
            <Button clickHandler={() => null} isSubordinate={true} disabled={isLoading}>
              Удалить ловушку
            </Button>
            <Button className={styles.openPreview} clickHandler={() => setPreviewStatus(true)}>
              <Icon name={EYE} />
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.preview}>
        <Button className={styles.closePreview} clickHandler={() => setPreviewStatus(false)}>
          <Icon name={CROSS} />
        </Button>{" "}
        <img className={styles.image} src={url} alt={url} />
      </div>
    </div>
  );
};

export default Trap;
