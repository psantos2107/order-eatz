import React, { useState } from "react";

const DisplayOrder = ({ orders }) => {
  const [totalPrice, setTotalPrice] = useState(0);

  const updateQuantity = (index, type) => {
    const newOrders = [...orders];

    if (type === "increase") {
      newOrders[index].quantity += 1;
    } else if (type === "decrease" && newOrders[index].quantity > 1) {
      newOrders[index].quantity -= 1;
    }

    calculateTotalPrice(newOrders);
  };

  const deleteOrder = (index) => {
    const newOrders = [...orders];
    newOrders.splice(index, 1);

    calculateTotalPrice(newOrders);
  };

  const calculateTotalPrice = (newOrders) => {
    let total = 0;
    newOrders.forEach((order) => {
      total += order.price * order.quantity;
    });
    setTotalPrice(total);
    //add a fetch request to update the total price in the database
  };

  return (
    <div>
      <h2 className="font-extrabold">Orders</h2>
      <ul>
        {orders ? (
          orders.map((order, index) => (
            <li key={index}>
              {order.name} - {order.quantity} - ${order.price * order.quantity}
              <button onClick={() => updateQuantity(index, "increase")}>
                Increase Quantity
              </button>
              <button onClick={() => updateQuantity(index, "decrease")}>
                Decrease Quantity
              </button>
              <button onClick={() => deleteOrder(index)}>Delete</button>
            </li>
          ))
        ) : (
          <h2>No food orders added yet.</h2>
        )}
      </ul>
      <h3>Total Price: ${totalPrice}</h3>

    </div>
  );
};

export default DisplayOrder;
