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

type Props = {
  trap: TrapType;
  labelingStrategy: LabelingStrategy;
};

const Trap: FC<Props> = ({ trap, labelingStrategy }: Props) => {
  const [previewStatus, setPreviewStatus] = useState(false);
  const {
    id,
    record: { selectedTags, url }
  } = trap;

  const renderTags = () => {
    const { tagMap } = labelingStrategy;
    const keys = Object.keys(tagMap);
    return keys.map((tag: string) => {
      const isSelected = selectedTags.includes(tag);
      const text = tag + " | " + tagMap[tag];
      return (
        <li key={tag}>
          <Checkbox title={text} clickHandler={() => null} isChecked={isSelected} />
        </li>
      );
    });
  };

  const trapClass = classNames(styles.trap, { [styles.trapShowPreview]: previewStatus });

  return (
    <div className={trapClass}>
      <div className={styles.settings}>
        <Fieldset name="ID ловушки" value={id} disabled={true} withCopyButton={true} />
        <Fieldset name="URL" value={url} disabled={true} withCopyButton={true} />
        <Textarea maxLength={100} id={id} rows={4} />
        <div>
          <h1 className={styles.title}>
            Категории ловушки{" "}
            <Button clickHandler={() => null}>
              <Icon name={TRASH} />
            </Button>
          </h1>
          <ul>{renderTags()}</ul>
          <div className={styles.controls}>
            <Button clickHandler={() => null} isSubordinate={true}>
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
