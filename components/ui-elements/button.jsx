import style from "./button.module.css";

const Button = (props) => {
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      className={`${style.button_container} ${props.className}`}
    >
      {props.children}
    </button>
  );
};

export default Button;
