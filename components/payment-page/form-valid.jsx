import { useFormState } from "react-dom";

import OrderAction from "@/lib/order-action";
import { useForm } from "../hooks/form-hook";
import { useFn } from "@/context/cart-data-context";
import Input from "../ui-elements/input";
import Button from "../ui-elements/button";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_PHONE,
} from "../util/validators";

import style from "./form-valid.module.css";

const FormValid = () => {
  const [state, formAction] = useFormState(OrderAction);
  const { setOrder } = useFn();

  const { inputHandler, formState } = useForm(
    {
      name: { value: "", isValid: false },
      email: { value: "", inValid: false },
      phone: { value: "", inValid: false },
      address: { value: "", inValid: false },
      payment: { value: "", inValid: false },
    },
    false
  );

  return (
    <form className={style.form_container} action={formAction}>
      <Input
        element="input"
        label="收件人姓名"
        type="text"
        id="name"
        name="name"
        onInput={inputHandler}
        touchError="收件人姓名 為必填"
        validators={[VALIDATOR_REQUIRE()]}
      />
      <Input
        element="input"
        label="Email"
        type="text"
        id="email"
        name="email"
        onInput={inputHandler}
        touchError="Email 為必填"
        validError="Email 格式錯誤"
        validators={[VALIDATOR_EMAIL(), VALIDATOR_REQUIRE()]}
      />
      <Input
        element="input"
        label="手機號碼"
        type="text"
        id="phone"
        name="phone"
        onInput={inputHandler}
        maxLength={10}
        touchError="手機號碼 為必填"
        validError="手機號碼 須為10位數字"
        validators={[VALIDATOR_MINLENGTH(10), VALIDATOR_PHONE()]}
      />
      <Input
        element="input"
        label="收件人地址"
        type="text"
        id="address"
        name="address"
        onInput={inputHandler}
        touchError="收件人地址 為必填"
        validators={[VALIDATOR_REQUIRE()]}
      />
      <Input
        element="select"
        label="付款方式"
        id="payment"
        name="payment"
        onInput={inputHandler}
        touchError="付款方式 為必選"
        validators={[VALIDATOR_REQUIRE()]}
      >
        <option value="" disabled>
          請選擇付款方式
        </option>
        <option value="atm">轉帳付款</option>
        <option value="credit">信用卡</option>
      </Input>

      <Button
        onClick={() => setOrder(true)}
        className={style.form_button}
        disabled={!formState.isValid}
      >
        確認付款
      </Button>
    </form>
  );
};

export default FormValid;
