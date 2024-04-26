const OrderForm = () => {
  return (
    <section>
      <h3>收件人資訊</h3>
      <form action="">
        <p>
          <label htmlFor="name">收件人姓名</label>
          <input type="text" id="name" name="name" required />
        </p>
        <p>
          <label htmlFor="eamil">Email</label>
          <input type="email" id="email" name="email" required />
        </p>
        <p>
          <label htmlFor="phone">電話號碼</label>
          <input
            type="text"
            minLength={10}
            maxLength={10}
            id="phone"
            name="phone"
            required
          />
        </p>
        <p>
          <label htmlFor="address">收件人地址</label>
          <input type="text" id="address" name="address" required />
        </p>
        <p>
          <label htmlFor="payment">付款方式</label>
          <select name="payment" id="payment" required>
            <option value="" disabled selected>
              請選擇付款方式
            </option>
            <option value="atm">轉帳付款</option>
            <option value="credit">信用卡</option>
          </select>
        </p>
        <button>確認付款</button>
      </form>
    </section>
  );
};

export default OrderForm;
