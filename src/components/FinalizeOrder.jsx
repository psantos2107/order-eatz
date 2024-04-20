import React, { useState } from 'react';

const FinalizeOrder = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [msg, setMsg] = useState('');

    const submitPayment = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setMsg("Payment succesfully processed.")
        }, 2000);
    };

    return (
        <div className="mt-60 text-center">
            <h2>Payment Page</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="mt-4">
                    <label htmlFor="card-number">Card Number:</label>
                    <input
                        type="text"
                        className='ml-2 shadow shadow-blue-500/40 hover:shadow-indigo-500/40'
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
                        className='ml-2 shadow shadow-blue-500/40 hover:shadow-indigo-500/40'
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
                        className='ml-2 shadow shadow-blue-500/40 hover:shadow-indigo-500/40'
                        id="cvv"
                        placeholder="123"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="button"
                    className="mt-4 border-2 border-gray-300 hover:border-blue-400"
                    onClick={submitPayment}
                    disabled={isLoading}
                >
                    {isLoading ? 'Processing...' : 'Submit Payment'}
                    {msg && (
                        <p className="text-center text-red-600 text-sm mt-2">{msg}</p>
                    )}
                </button>
            </form>
        </div>
    );
};

export default FinalizeOrder;
