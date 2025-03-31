import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OrdersPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function OrdersPage() {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);

  const foodItems = [
    {
      id: 1,
      name: "Biryani",
      image: "https://png.pngtree.com/thumb_back/fh260/background/20240204/pngtree-top-view-of-chicken-biryani-indian-food-delicious-ramadan-iftar-meal-image_15585911.png",
      description: "A delicious Biryani with all the fixings.",
      price: 250,
    },
    {
      id: 2,
      name: "Pizza",
      image: "https://t3.ftcdn.net/jpg/00/27/57/96/360_F_27579652_tM7V4fZBBw8RLmZo0Bi8WhtO2EosTRFD.jpg",
      description: "Classic Margherita pizza with fresh basil and mozzarella.",
      price: 200,
    },
    {
      id: 3,
      name: "MilShakes",
      image: "https://t3.ftcdn.net/jpg/02/30/03/40/360_F_230034057_Sqlbff6O4AssaILToSbTzUrTpQEycOHu.jpg",
      description: "A rich and creamy milkshake with your choice of flavor.",
      price: 250,
    },
    {
      id: 4,
      name: "Tiffins",
      image: "https://content3.jdmagicbox.com/v2/comp/hyderabad/g5/040pxx40.xx40.220316203601.c6g5/catalogue/gheeidli-tiffin-centre-shaikpet-hyderabad-tiffin-services-7c6ns7uuur.jpg",
      description: "Enjoy wholesome, homemade meals on-the-go with our delicious Tiffins.",
      price: 50,
    },
    {
      id: 5,
      name: "Noodles",
      image: "https://img.freepik.com/premium-photo/schezwan-hakka-noodles-with-paneer-cottage-cheese-served-bowl-selective-focus_466689-32656.jpg?semt=ais_hybrid",
      description: "Enjoy a delightful plate of Schezwan Hakka noodles with paneer, a perfect blend of flavors.",
      price: 80,
    }
  ];

  const handleOrderNow = (item, quantity) => {
    const existingItem = selectedItems.find((selectedItem) => selectedItem.id === item.id);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        setSelectedItems([...selectedItems, { ...item, quantity }]);
    }
    const generateRandomUserId = () => {
      return Math.floor(Math.random() * 1000) + 1;
    };

    // Send order data to the backend
    fetch('http://localhost:5000/place_order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id: generateRandomUserId, 
            item_id: item.id,
            quantity: quantity,
            item_name: item.name,
            item_price: item.price
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            toast(`Ordering ${quantity} ${item.name}(s)...`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            navigate('/checkout', { state: { selectedItems } });
        } else {
            toast.error('Failed to place order', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    })
    .catch(error => console.error('Error:', error));
};

  return (
    <>
      <ToastContainer />
      <div className="container mt-3">
        <h2 className="text-center text-black ">Your Orders</h2>
        <div className="row">
          {foodItems.map((item) => (
            <div key={item.id} className="col-md-4 col-sm-6 col-12 mb-3">
              <div className="card h-100">
                <img src={item.image} alt={item.name} className="card-img-top" style={{ height: "200px", objectFit: "cover" }} />
                <div className="card-body d-flex flex-column">
                  <h3 className="card-title">{item.name}</h3>
                  <p className="card-text">{item.description}</p>
                  <p className="card-text price">₹{item.price}</p>
                  <div className="d-flex align-items-center">
                    <label className="mr-2">Quantity:</label>
                    <input
                      type="number"
                      className="form-control form-control-sm mr-1 mx-1"
                      min="1"
                      defaultValue="1"
                      style={{ width: "60px" }}
                    />
                    <button
                      onClick={(e) => {
                        const quantity = parseInt(e.target.previousElementSibling.value, 10);
                        handleOrderNow(item, quantity);
                      }}
                      className="btn btn-orange mx-2"
                    >
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default OrdersPage;