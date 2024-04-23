import { useState, useEffect } from "react";
import MenuComponent from "../components/MenuComponent";
import DisplayOrder from "../components/DisplayOrder";
import FoodDescription from "../components/FoodDescription";

const OrderPage = () => {
  //for useEffect:
  //my plan:
  //need to upload the most recently active order OR create a new order
  //1. get a list of all orders that are currently active, then use array methods to see A: if there any orders, and then if any of them are "not submitted". if there are any that are "not submitted", grab that one and display it. OTHERWISE, simply create a new order (post request -> )

  //2. create a handleDetails IN THE MENU COMPONENT PAGE
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

  function handleAddToOrder() {
    //code here...
    //PLAN: when button is pressed for add to order, you grab the food ID (use dataset),
    //THEN, you make a patch request to orders and update the current order.
    //THEN, re-render the orders component to display the new state of the order.
    //consider: you can really just create a piece of state that re-runs the useEffect above when that state changes. but it might be expensive to do since the user may have an extensive order hx.
    //consider re-setting the "orderState" via the click handle button separately.
    //need to make sure the logic behind adding to orders was set up correctly.
  }

  //OTHER TO DO (for Paul or whomever)
  /*
  (1) Add pagination to menu
  (2) Filter and search bar for the menu. 
  (3) Implement authorization appropriately (by Wednesday.)
  (4) Complete your stylings for the reviews portion.
  (5) Featured reviews? Just choose three random reviews from the entire database to feature (only with ratings 4 and up)
  */

  return (
    <div className="w-full py-24 flex space-evenly">
      <MenuComponent partOfOrderPage={true}>
        <button className="p-1 bg-slate-300">Add to order</button>
        <button className="p-1 bg-slate-300" onClick={handleFoodDetails}>
          See food details
        </button>
      </MenuComponent>
      <section className="p-4 w-1/2 flex flex-col">
        <DisplayOrder orders={order?.orders} initialPrice={order.totalPrice} />
        <FoodDescription idForFoodPreview={idForFoodPreview} />
      </section>
    </div>
  );
};

export default OrderPage;
