import React, { useState } from 'react';

const FinalizeOrder = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const submitPayment = () => {
        // Simulate payment processing
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            alert('Payment successful! (This is a fake payment)');
            // You can redirect or perform other actions after successful payment
        }, 2000);
    };

    return (
        <div className="text-center">
            <h2>Fake Payment Page</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="mt-20">
                    <label htmlFor="card-number">Card Number</label>
                    <input
                        type="text"
                        id="card-number"
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="expiry-date">Expiry Date</label>
                    <input
                        type="text"
                        id="expiry-date"
                        placeholder="MM/YY"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="cvv">CVV</label>
                    <input
                        type="text"
                        id="cvv"
                        placeholder="123"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="button"
                    className="btn"
                    onClick={submitPayment}
                    disabled={isLoading}
                >
                    {isLoading ? 'Processing...' : 'Submit Payment'}
                </button>
            </form>
        </div>
    );
};

export default FinalizeOrder;
