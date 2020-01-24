import React, { FC, MouseEvent } from "react";
import styles from "./index.css";
import { Checkbox } from "../Checkbox";
import { Button } from "../Button";
import { Icon } from "../Icon";
import { PLUS, TRASH } from "../../constants/icons";
import { ITags } from "../../types/tags";
import { Fieldset } from "../Fieldset";

interface Props {
  multiSelectEnabled: boolean;
  setMultiSelectEnabled: () => void;
  addCategory: () => void;
  deleteCategory: (id: string) => void;
  setCategoryCode: (categoryCode: string, id: string) => void;
  setCategoryValue: (categoryValue: string, id: string) => void;
  tags: ITags;
}

export const Categories: FC<Props> = ({
  deleteCategory,
  setCategoryCode,
  setCategoryValue,
  setMultiSelectEnabled,
  addCategory,
  multiSelectEnabled,
  tags
}: Props) => {
  const categories = Object.keys(tags).map(tag => {
    const { categoryCode, categoryValue } = tags[tag];

    return (
      <li key={tag} className={styles.category}>
        <Button
          clickHandler={(e: MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            deleteCategory(tag);
          }}
        >
          <Icon name={TRASH} />
        </Button>
        <Fieldset
          value={categoryCode}
          placeholder="Код"
          type="text"
          changeHandler={value => setCategoryCode(value, tag)}
        />
        <Fieldset
          value={categoryValue}
          placeholder="Название"
          type="text"
          changeHandler={value => setCategoryValue(value, tag)}
        />
      </li>
    );
  });

  return (
    <div>
      <h1 className={styles.title}>Категории для разметки</h1>
      <Checkbox title="Несколько категорий" clickHandler={setMultiSelectEnabled} isChecked={multiSelectEnabled} />
      <h2 className={styles.subtitle}>Категории</h2>
      {Object.keys(categories).length > 0 && <ul className={styles.list}>{categories}</ul>}
      <Button
        className={styles.button}
        clickHandler={(e: MouseEvent<HTMLButtonElement>) => {
          e.preventDefault();
          addCategory();
        }}
        isAccentLight={true}
      >
        <Icon name={PLUS} /> Добавить категорию
      </Button>
    </div>
  );
};
