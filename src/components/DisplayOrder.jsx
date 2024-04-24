import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const DisplayOrder = ({ orders, totalPrice, handleDeleteItem, orderID }) => {
  const URL = "http://localhost:3000/api";
  const navigate = useNavigate();
  // const [totalPrice, setTotalPrice] = useState(initialPrice);

  /*
  const updateQuantity = (index, type) => {
    const newOrders = [...orders];
    if (type === "increase") {
      newOrders[index].quantity += 1;
    } else if (type === "decrease" && newOrders[index].quantity > 1) {
      newOrders[index].quantity -= 1;
    }

    calculateTotalPrice(newOrders);
  }; */

  const deleteEntireOrder = (id) => {
    const orderID = id;
    async function deleteOrder() {
      try {
        await fetch(`${URL}/orders/${orderID}`, {
          method: "DELETE",
        });
        navigate("/home");
      } catch (err) {
        //maybe add error handling here if we have time.
        console.log(err.message);
      }
    }
    deleteOrder();
  };
  /*
  const calculateTotalPrice = (newOrders) => {
    let total = 0;
    newOrders.forEach((order) => {
      total += order.price * order.quantity;
    });
    setTotalPrice(total);
    //add a fetch request to update the total price in the database
  }; */

  console.log(orders);
  return (
    <div>
      <h2>Orders</h2>
      <ul>
        {(orders && orders.length) > 0 ? (
          orders.map((order, index) => (
            <li key={index}>
              {order.name} - {order.quantity} - ${order.price}
              <button onClick={() => updateQuantity(index, "increase")}>
                Increase Quantity
              </button>
              <button onClick={() => updateQuantity(index, "decrease")}>
                Decrease Quantity
              </button>
              <button data-foodid={order._id} onClick={handleDeleteItem}>
                Delete Item
              </button>
            </li>
          ))
        ) : (
          <h2>No food orders added yet.</h2>
        )}
      </ul>
      <h3>Total Price: ${totalPrice}</h3>
      <button onClick={() => deleteEntireOrder(orderID)}>
        Delete Entire Order
      </button>
      <Link to="/checkout">Go to Checkout</Link>
    </div>
  );
};

export default DisplayOrder;
