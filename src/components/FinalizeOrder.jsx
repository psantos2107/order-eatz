import React, { useState, useEffect } from "react";
import DisplayOrder from "./DisplayOrder";
import { useParams } from "react-router-dom";

const FinalizeOrder = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [order, setOrder] = useState({});
  const { id } = useParams();
  const URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function fetchOrder() {
      const res = await fetch(`${URL}/orders/${id}`);
      const order = await res.json();
      setOrder(order);
    }
    fetchOrder();
  }, []);

  const submitPayment = async () => {
    if (!cardNumber || !expiryDate || !cvv) {
      setMsg("Please fill in all payment details.");
      return;
    }
    setIsLoading(true);

    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        throw new Error("Token not found");
      }
      const response = await fetch(`${URL}/orders/${id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ isSubmitted: true }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsLoading(false);
        setMsg("Payment successful! Thanks for your order.");
      } else {
        setMsg("Payment failed! Please try again");
      }
    } catch (error) {
      setIsLoading(false);
      setMsg(error.message);
    }
  };

  return (
    <div className="text-lg text-center flex pt-80 items-start">
      <div className="w-1/2">
        <DisplayOrder
          orders={order.orders}
          totalPrice={order.totalPrice}
          orderID={order.order_id}
          handleDeleteItem={null}
        />
      </div>
      <div className="w-1/2 pb-1 bg-white">
        <h2 className="font-bold text-4xl"> Payment Page</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mt-4">
            <label htmlFor="card-number">Card Number:</label>
            <input
              type="text"
              className="ml-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="card-number"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
            />
          </div>
          <div className="mt-2">
            <label htmlFor="expiry-date">Expire Date:</label>
            <input
              type="text"
              className="ml-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="expiry-date"
              placeholder="MM/YY"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              required
            />
          </div>
          <div className="mt-2">
            <label htmlFor="cvv">CVV Number:</label>
            <input
              type="text"
              className="ml-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="cvv"
              placeholder="123"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              required
            />
          </div>
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-4 py-1 px-4 rounded mr-2"
            onClick={submitPayment}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Submit Payment"}
          </button>
          {msg && (
            <p className="text-center text-2xl text-red-600 mt-4">{msg}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default FinalizeOrder;
