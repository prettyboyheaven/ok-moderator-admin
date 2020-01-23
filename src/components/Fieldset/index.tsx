import React from "react";
import styles from "./index.pcss";
import { Button } from "../Button";

interface Props {
  name?: string;
  disabled?: boolean;
  withCopyButton?: boolean;
  value: string | number;
  placeholder: string;
  type: string;
  changeHandler: (value: string) => void;
}

export const Fieldset = ({ name, value, changeHandler, placeholder, type, disabled, withCopyButton }: Props) => {
  const renderInput = () => {
    if (withCopyButton && disabled) {
      const copyText = () => {
        navigator.clipboard
          .writeText(value as string)
          .then(() => alert(`Значение: ${value} успешно скопировано`))
          .catch(err => alert(`Что-то пошло не так: ${err}`));
      };

      return (
        <div className={styles.container}>
          <input className={styles.input} type={type} value={value} disabled={disabled} />
          <Button className={styles.copyButton} clickHandler={copyText}>
            Копировать
          </Button>
        </div>
      );
    }

    return (
      <input
        className={styles.input}
        type={type}
        value={value}
        onChange={e => {
          changeHandler(e.target.value);
        }}
        placeholder={placeholder}
        disabled={disabled}
      />
    );
  };

  return (
    <fieldset>
      {name && <legend className={styles.title}>{name}</legend>}
      {renderInput()}
    </fieldset>
  );
};
