import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PaymentPage.scss";

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { course } = location.state || {};

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  if (!course) return <p>Course not found</p>;

  const handlePayment = (e) => {
    e.preventDefault();
    alert(`Payment Successful for ${course.name} - ${course.price}`);
    navigate("/"); // Redirect to home or course page after payment
  };

  return (
    <div className="payment-container">
      <div className="payment-card">
        <h1>Checkout</h1>
        <p className="course-info">{course.name} - {course.price}</p>

        <form onSubmit={handlePayment}>
          <div className="form-group">
            <label>Card Number</label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Expiry Date</label>
              <input
                type="text"
                placeholder="MM/YY"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>CVV</label>
              <input
                type="password"
                placeholder="123"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="pay-btn">Pay {course.price}</button>
        </form>

        <p className="back-link" onClick={() => navigate(-1)}>
          ← Back to Course
        </p>
      </div>
    </div>
  );
}
