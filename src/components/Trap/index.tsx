import React, { FC, useState } from "react";
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
import axios from "axios";

interface Props {
  trap: TrapType;
  labelingStrategy: LabelingStrategy;
  setFetchStatus: (fetchStatus: boolean) => void;
}

interface ModifyTrap {
  type: string;
  value?: string;
}

const Trap: FC<Props> = ({ trap, labelingStrategy, setFetchStatus }: Props) => {
  const [previewStatus, setPreviewStatus] = useState(false);

  const {
    id,
    record: { selectedTags, url, description, datasetId }
  } = trap;

  const transformTrap = ({ type, value }: ModifyTrap): TrapType => {
    const copiedTrap = { ...trap };
    const record = { ...trap.record };
    switch (type) {
      case "TOGGLE_TAG": {
        if (value) {
          record.selectedTags = trap.record.selectedTags.includes(value)
            ? trap.record.selectedTags.filter((selectedTag: string) => selectedTag !== value)
            : [...trap.record.selectedTags, value];
          copiedTrap.record = record;
        }
        return copiedTrap;
      }
      case "RESET_TAGS": {
        record.selectedTags = [];
        copiedTrap.record = record;
        return copiedTrap;
      }
      case "CHANGE_DESCRIPTION": {
        if (typeof value === "string") {
          record.description = value.trim();
          copiedTrap.record = record;
        }
        return copiedTrap;
      }
      default:
        return copiedTrap;
    }
  };

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

  const modifyTrapHandler = ({ type, value }: ModifyTrap) => {
    const trap = transformTrap({ type, value });
    axios.get(endpoint(trap)).then(res => {
      if (res.data.success) {
        setFetchStatus(true);
      }
    });
  };

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
            clickHandler={() => modifyTrapHandler({ type: "TOGGLE_TAG", value: tag })}
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
        <Fieldset
          name="ID ловушки"
          value={id}
          disabled={true}
          withCopyButton={true}
          type="text"
          changeHandler={() => null}
          placeholder="ID ловушки"
        />
        <Fieldset
          name="URL"
          value={url}
          disabled={true}
          withCopyButton={true}
          type="text"
          changeHandler={() => null}
          placeholder="URL"
        />
        <Textarea
          value={description}
          maxLength={100}
          id={id}
          rows={4}
          blurHandler={value => modifyTrapHandler({ type: "CHANGE_DESCRIPTION", value })}
        />
        <div>
          <h1 className={styles.title}>
            Категории ловушки{" "}
            <Button clickHandler={() => modifyTrapHandler({ type: "RESET_TAGS" })} disabled={isResetTagsButtonDisabled}>
              <Icon name={TRASH} />
            </Button>
          </h1>
          <ul>{renderTags()}</ul>
          <div className={styles.controls}>
            <Button clickHandler={ () => null} isSubordinate={true}>
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
