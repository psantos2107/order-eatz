import { useState, useEffect } from "react";
import MenuComponent from "../components/MenuComponent";
import DisplayOrder from "../components/DisplayOrder";
import FoodDescription from "../components/FoodDescription";

const OrderPage = () => {
  const URL = "http://localhost:3000/api";
  const [idForFoodPreview, setIdForFoodPreview] = useState("");
  const [order, setOrder] = useState({});

  //note: user ID is hardcoded until authorization portion is completed.
  useEffect(() => {
    async function fetchOrCreateUserOrder() {
      const res = await fetch(
        `${URL}/orders/user/${"661db0c3b89cd9ddc465476b"}`
      );
      const userOrders = await res.json();
      const openOrder = userOrders.find((order) => order.isSubmitted === false);
      if (!openOrder || userOrders.length === 0) {
        const res = await fetch(`${URL}/orders`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const newOrder = await res.json();
        console.log("Created a new order", newOrder);
        setOrder(newOrder);
      } else {
        console.log("Opened an existing order", openOrder);
        setOrder(openOrder);
      }
    }

    fetchOrCreateUserOrder();
  }, []);

  function handleFoodDetails(e) {
    e.preventDefault();
    setIdForFoodPreview(e.target.parentNode.dataset.foodid);
  }

  function handleAddtoOrder(e) {
    e.preventDefault();
    const foodId = e.target.parentNode.dataset.foodid;

    async function addToOrder() {
      const res = await fetch(`${URL}/orders/${order._id}/addItem`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          foodId,
        }),
      });
      const updatedOrder = await res.json();
      setOrder(updatedOrder);
    }
    addToOrder();
  }

  function handleDeleteItem(e) {
    e.preventDefault();
    const foodId = e.target.dataset.foodid;

    async function deleteFromOrder() {
      const res = await fetch(`${URL}/orders/${order._id}/removeItem`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          foodId,
        }),
      });
      const updatedOrder = await res.json();
      setOrder(updatedOrder);
    }
    deleteFromOrder();
  }

  return (
    <div className="w-full py-24 flex space-evenly">
      <MenuComponent partOfOrderPage={true}>
        <button className="p-1 bg-slate-300" onClick={handleAddtoOrder}>
          Add to order
        </button>
        <button className="p-1 bg-slate-300" onClick={handleFoodDetails}>
          See food details
        </button>
      </MenuComponent>
      <section className="p-4 w-1/2 flex flex-col">
        <DisplayOrder
          orders={order?.orders}
          initialPrice={order.totalPrice}
          handleDeleteItem={handleDeleteItem}
        />
        <FoodDescription idForFoodPreview={idForFoodPreview} />
      </section>
    </div>
  );
};

export default OrderPage;

//OTHER TO DO (for Paul or whomever)
/*
  (1) Add pagination to menu
  (2) Filter and search bar for the menu. 
  (3) Implement authorization appropriately (by Wednesday.)
  (4) Complete your stylings for the reviews portion.
  (5) Featured reviews? Just choose three random reviews from the entire database to feature (only with ratings 4 and up)
  */
