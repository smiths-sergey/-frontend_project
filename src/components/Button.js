import classNames from "classnames";
import styles from "./Button.module.css";
export const Button = ({
  isDisabled = false,
  type = "primary",
  text = "Войти",
  onClick = null,
}) => {
  const className = classNames(styles["btn"], {
    [styles["primary"]]: type === "primary",
    [styles["secondary"]]: type === "secondary",
    [styles["is-disabled"]]: isDisabled,
  });

  const handleClick = (e) => {
    if (typeof onClick === "function") {
      onClick(e);
    }
  };

  return (
    <button className={className} disabled={isDisabled} onClick={handleClick}>
      {text}
    </button>
  );
};
