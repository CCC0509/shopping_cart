import { useInputValid } from "../hooks/useInputValid";

import style from "./input.module.css";

const Input = (props) => {
  const { inputState, changeHandler, touchHandler } = useInputValid(props);
  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
        maxLength={props.maxLength}
        className={`${style.input}
        ${
          inputState.isTouched ||
          (!inputState.isValid && inputState.value.trim() !== "")
            ? style.error
            : ""
        }`}
      />
    ) : (
      <select
        id={props.id}
        name={props.name}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
        className={style.input}
      >
        {props.children}
      </select>
    );

  if (inputState.isTouched) {
  }

  return (
    <div className={style.input_container}>
      <div>
        <label htmlFor={props.id}>{props.label}</label>
        <span className={style.importent}>*</span>
      </div>
      {element}
      {inputState.isTouched && (
        <p
          className={`${style.message} ${
            inputState.isTouched ? style.error : ""
          }`}
        >
          {props.touchError}
        </p>
      )}
      {!inputState.isValid && inputState.value.trim() !== "" && (
        <p
          className={`${style.message} ${
            !inputState.isValid && inputState.value.trim() !== ""
              ? style.error
              : ""
          }`}
        >
          {props.validError}
        </p>
      )}
    </div>
  );
};

export default Input;
