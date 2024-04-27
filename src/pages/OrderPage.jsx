import { useState, useEffect } from "react";
import MenuComponent from "../components/MenuComponent";
import DisplayOrder from "../components/DisplayOrder";
import FoodDescription from "../components/FoodDescription";

const OrderPage = () => {
  const URL = import.meta.env.VITE_API_URL;
  const [idForFoodPreview, setIdForFoodPreview] = useState("");
  const [order, setOrder] = useState({});

  useEffect(() => {
    async function fetchOrCreateUserOrder() {
      try {
        //checks if there is a token in localStorage, if no token is found. It is OK! because you can create an order as a guest
        const token = localStorage.getItem("userToken");
        if (!token) {
          const res = await fetch(`${URL}/orders`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              guestOrder: "true",
            },
          });
          const newOrder = await res.json();
          console.log("Created a new order for a guest", newOrder);
          setOrder(newOrder);
        } else {
          //changed this fetch route entirely so that no id is needed
          const res = await fetch(`${URL}/orders/user`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
          });
          const userOrders = await res.json();
          const openOrder = userOrders.find(
            (order) => order.isSubmitted === false
          );
          if (!openOrder || userOrders.length === 0) {
            const res = await fetch(`${URL}/orders`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
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
      } catch (err) {
        console.log(err.message);
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
    <div className="w-full py-24 flex space-evenly">
      <div className="overflow-scroll w-1/2" style={{ maxHeight: "800px" }}>
        <MenuComponent partOfOrderPage={true}>
          <button className="p-1 bg-slate-300" onClick={handleAddtoOrder}>
            Add to order
          </button>
          <button className="p-1 bg-slate-300" onClick={handleFoodDetails}>
            See food details
          </button>
        </MenuComponent>
      </div>
      <section className="p-4 w-1/2 flex flex-col">
        <DisplayOrder
          orders={order?.orders}
          totalPrice={order.totalPrice}
          handleDeleteItem={handleDeleteItem}
          orderID={order._id}
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
