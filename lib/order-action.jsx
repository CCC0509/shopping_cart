"use server";

const OrderAction = async (prevData, formData) => {
  const consumer = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    payment: formData.get("payment"),
  };

  console.log(consumer);
};

export default OrderAction;
