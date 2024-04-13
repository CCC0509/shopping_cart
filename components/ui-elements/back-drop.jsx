import style from "./back-drop.module.css";

const BackDrop = (props) => {
  return (
    <div
      className={`${style.back_drop} ${props.className}`}
      onClick={props.onClick}
    ></div>
  );
};

export default BackDrop;
