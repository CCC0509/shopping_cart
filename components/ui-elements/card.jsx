import style from "./card.module.css";

const Card = (props) => {
  return (
    <div
      onMouseDown={props.onMouseDown}
      className={`${style.card} ${props.className}`}
    >
      {props.children}
    </div>
  );
};

export default Card;
