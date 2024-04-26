const OrderAction = (formData) => {
  const isEmpty = (text) => {
    return !text || text.trim() === "";
  };
  const consumer = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    payment: formData.get("payment"),
  };

  if (
    isEmpty(consumer.name) ||
    isEmpty(consumer.email) ||
    isEmpty(consumer.phone) ||
    isEmpty(consumer.address) ||
    isEmpty(consumer.payment)
  ) {
    return { errorMessage: "資料不可空白" };
  }
};

export default OrderAction;
