import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const DisplayOrder = ({ orders, totalPrice, handleDeleteItem, orderID }) => {
  const URL = "http://localhost:3000/api";
  const navigate = useNavigate();

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

  return (
    <>
    <div className="text-center">
      <div>
        <h1 className="font-bold text-4xl">Your Order</h1>
        <ul>
          {(orders && orders.length) > 0 ? (
            orders.map((order, index) => (
              <li className="text-xl" key={index}>
                {order.name} : ${order.price}
                {handleDeleteItem ? (
                  <button className="ml-2 px-2 bg-red-500 text-white rounded hover:bg-red-600 hover:text-white" data-foodid={order._id} onClick={handleDeleteItem}>
                    Delete Item
                  </button>
                ) : (
                  ""
                )}
              </li>
            ))
          ) : (
            <h2 className="text-xl">No food orders added yet.</h2>
          )}
        </ul>
        <h3 className="font-bold text-3xl">Total Price: ${totalPrice}</h3>
        {!handleDeleteItem ? <Link className="ml-2 px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 hover:text-white" to="/order">Go Back to Order Page</Link> : ""}
      </div>
      {handleDeleteItem ? (
        <div>
        <Link className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 hover:text-white" to={`/checkout/${orderID}`}>Go to Checkout</Link>
        <button className="ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 hover:text-white" onClick={() => deleteEntireOrder(orderID)}>Delete Order</button>
        </div>
      ) : (
        ""
      )}
      </div>
    </>
  );
};

export default DisplayOrder;

//EXTRA CODE.
/*
  // const [totalPrice, setTotalPrice] = useState(initialPrice);

  const updateQuantity = (index, type) => {
    const newOrders = [...orders];
    if (type === "increase") {
      newOrders[index].quantity += 1;
    } else if (type === "decrease" && newOrders[index].quantity > 1) {
      newOrders[index].quantity -= 1;
    }

    calculateTotalPrice(newOrders);
  }; */

/*
  const calculateTotalPrice = (newOrders) => {
    let total = 0;
    newOrders.forEach((order) => {
      total += order.price * order.quantity;
    });
    setTotalPrice(total);
    //add a fetch request to update the total price in the database
  };

  <button onClick={() => updateQuantity(index, "increase")}>
                  Increase Quantity
                </button>
                <button onClick={() => updateQuantity(index, "decrease")}>
                  Decrease Quantity
                </button>
*/
