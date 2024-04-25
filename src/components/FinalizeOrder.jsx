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
  const URL = "http://localhost:3000/api";

  useEffect(() => {
    async function fetchOrder() {
      const res = await fetch(`${URL}/orders/${id}`);
      const order = await res.json();
      setOrder(order);
    }
    fetchOrder();
  }, []);

  const submitPayment = async () => {
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }
      const response = await fetch(`http://localhost:3000/api/orders/${id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ isSubmitted: true }),
      });

      const data = await response.json();
      console.log("paymemt submitted", data);

      if (response.ok) {
        setIsLoading(false);
        setMsg("Payment successful! Thanks for your order.");
      } else {
        throw new Error(data.message || "Payment processing failed.");
      }
    } catch (error) {
      setIsLoading(false);
      setMsg(error.message);
    }
  };

  return (
    <div className="mt-60 text-lg text-center flex">
      <div className="w-1/2">
        <DisplayOrder
          orders={order.orders}
          totalPrice={order.totalPrice}
          orderID={order.order_id}
          handleDeleteItem={null}
        />
      </div>
      <div className="w-1/2">
        <h2> Payment Page</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mt-4">
            <label htmlFor="card-number">Card Number:</label>
            <input
              type="text"
              className="ml-2 shadow shadow-blue-500/40"
              id="card-number"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
            />
          </div>
          <div className="mt-2">
            <label htmlFor="expiry-date">Expiry Date:</label>
            <input
              type="text"
              className="ml-2 shadow shadow-blue-500/40"
              id="expiry-date"
              placeholder="MM/YY"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              required
            />
          </div>
          <div className="mt-2">
            <label htmlFor="cvv">CVV:</label>
            <input
              type="text"
              className="ml-2 shadow shadow-blue-500/40 "
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
            <p className="text-center text-lg text-red-600 mt-4">{msg}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default FinalizeOrder;
