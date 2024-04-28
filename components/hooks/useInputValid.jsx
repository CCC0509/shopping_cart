import { useReducer, useEffect } from "react";
import { validate } from "../util/validators";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
        isTouched: action.val.trim() === "" ? true : false,
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: action.val.trim() === "" ? true : false,
      };
    default:
      return state;
  }
};

export const useInputValid = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.value || "",
    isTouched: false,
    isValid: props.valid || false,
  });

  const changeHandler = (e) => {
    dispatch({
      type: "CHANGE",
      val: e.target.value,
      validators: props.validators,
    });
  };

  const touchHandler = (e) => {
    dispatch({ type: "TOUCH", val: e.target.value });
  };

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [onInput, id, value, isValid]);
  return { inputState, changeHandler, touchHandler };
};
