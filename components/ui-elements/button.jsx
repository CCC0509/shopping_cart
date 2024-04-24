import style from "./button.module.css";

const Button = (props) => {
  return (
    <button
      onClick={props.onClick}
      onMouseDown={props.onMouseDown}
      disabled={props.disabled}
      className={`${style.button_container} ${
        props.event ? style.event_btn : ""
      } ${props.active ? style.active : ""} ${props.className}`}
      id={props.id}
    >
      {props.children}
    </button>
  );
};

export default Button;
