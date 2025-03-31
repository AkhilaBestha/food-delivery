import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import './CheckoutForm.css';
import axios from 'axios';
import GoogleMapsModal from './GoogleMaps';

function CheckoutForm() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [cardModalShow, setCardModalShow] = useState(false);
  const [rating, setRating] = useState(null);
  const [latestOrders, setLatestOrders] = useState([]);
  const [totalBill, setTotalBill] = useState(0);
  const [address, setAddress] = useState(''); 
  const [paymentMethod, setPaymentMethod] = useState('cod'); 
  const [cardDetails, setCardDetails] = useState({
    cardholderName: '',
    cardNumber: '',
  });
  const [googleMapsModalShow, setGoogleMapsModalShow] = useState(false); 
  const [error, setError] = useState(''); 
  const [successMessage, setSuccessMessage] = useState(''); 
  const generateRandomUserId = () => {
    return Math.floor(Math.random() * 1000) + 1;
  };
  

  useEffect(() => {
    axios.get('http://localhost:5000/fetch_latest_orders')
      .then(response => {
        const orders = response.data.latest_orders || [];
        setLatestOrders(orders);

        const total = orders.reduce((total, order) => total + order.item_price * order.quantity, 0);
        setTotalBill(total);
      })
      .catch(error => {
        console.error('Error fetching latest orders:', error);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      const data = {
        user_id: generateRandomUserId(), 
        address: address,
        payment: totalBill,
        card_details: paymentMethod === 'cod' ? null : cardDetails,
      };

      const response = await axios.post('http://localhost:5000/post_address', data);

      if (response.status === 201) {
        setSuccessMessage('Address and payment details saved successfully!');
        // Optionally navigate or perform further actions
      }
    } catch (err) {
      setError('Error saving address and payment details: ' + err.response?.data?.error || err.message);
    }
  };

  const handlePaymentMethodChange = (event) => {
    const method = event.target.value;
    setPaymentMethod(method);
    if (method === 'debit' || method === 'credit') {
      setCardModalShow(true);
    } else {
      setCardModalShow(false);
    }
  };

  const handleAddressSelect = (address) => {
    setAddress(address);
  };

  const handleOpenGoogleMapsModal = () => {
    setGoogleMapsModalShow(true);
  };

  return (
    <>
      <div className="checkout-container">
        <h2>Checkout</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="checkoutForm.address">
            <Form.Label><span className='text-danger  px-1'>*</span>Delivery Address :</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
              <InputGroup.Text onClick={handleOpenGoogleMapsModal}>
                <img src="location_map_pin_orange5.png" alt="Map" style={{ width: '20px', height: '30px', cursor: 'pointer' }} />
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="checkoutForm.payment" className='pt-2'>
            <Form.Label><span className='text-danger px-1'>*</span>Payment Method :</Form.Label>
            <Form.Control as="select" value={paymentMethod} onChange={handlePaymentMethodChange} required>
            <option value='upi'>UPI</option>
            <option value="debit">Debit Card</option>
            <option value="credit">Credit Card</option>
            <option value="cod">Cash on Delivery</option>
            </Form.Control>
          </Form.Group>

          <div className="selected-items">
            <h3>Selected Items</h3>
            {latestOrders.length > 0 ? (
              latestOrders.map((order) => (
                <div key={order.id}>
                  <p>{order.item_name} - Quantity: {order.quantity} - Price: ₹{order.item_price * order.quantity}</p>
                </div>
              ))
            ) : (
              <p>No items selected.</p>
            )}
            {latestOrders.length > 0 && (
              <h3>Total Bill: ₹{totalBill}</h3>
            )}
          </div>

          <Button variant="primary" type="submit" className='mt-2'>
            Place Order
          </Button>
        </Form>

        {error && <div className="error-message" style={{ color: 'red' }}>{error}</div>}
        {successMessage && <div className="success-message" style={{ color: 'green' }}>{successMessage}</div>}
      </div>

      <Modal show={show} onHide={() => setShow(false)} className='modal-dialog-centered'>
        <Modal.Header closeButton className='modal-header'>
          <Modal.Title>Rate Us</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>How would you like to rate your experience?</p>
          <div className="rating-星星">
            {[...Array(5)].map((_, index) => (
              <span
                key={index + 1}
                onClick={() => setRating(index + 1)}
                style={{
                  cursor: 'pointer',
                  color: rating >= index + 1 ? 'orange' : 'gray',
                  fontSize: '25px',
                }}
                className='px-3'
              >
                {rating >= index + 1 ? '★' : '☆'}
              </span>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary">
            Submit
          </Button>
          <Button variant="link" onClick={() => setShow(false)}>
            No, Thanks
          </Button>
        </Modal.Footer>
      </Modal>

      <GoogleMapsModal
        show={googleMapsModalShow}
        onHide={() => setGoogleMapsModalShow(false)}
        onAddressSelect={handleAddressSelect}
      />

      <Modal show={cardModalShow} onHide={() => setCardModalShow(false)} className='modal-dialog-centered'>
        <Modal.Header closeButton className='modal-header'>
          <Modal.Title>Enter Card Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="cardForm.cardholderName">
              <Form.Label>Cardholder Name :</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter cardholder name"
                value={cardDetails.cardholderName}
                onChange={(e) => setCardDetails({ ...cardDetails, cardholderName: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group controlId="cardForm.cardNumber">
              <Form.Label>Card Number :</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter card number"
                value={cardDetails.cardNumber}
                onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group controlId="cardForm.expirationDate">
              <Form.Label>Expiration Date :</Form.Label>
              <Form.Control
                type="text"
                placeholder="MM/YY"
                value={cardDetails.expirationDate}
                onChange={(e) => setCardDetails({ ...cardDetails, expirationDate: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group controlId="cardForm.cvv">
              <Form.Label>CVV :</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter CVV"
                value={cardDetails.cvv}
                onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setCardModalShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => setCardModalShow(false)}>
            Add Card
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CheckoutForm;
