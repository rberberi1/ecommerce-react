import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { addToCart, cartItems, increase, decrease, removeFromCart } = useCart();

  const cartItem = cartItems.find(item => item.id === product.id); 
  const [quantity, setQuantity] = useState(cartItem ? cartItem.quantity : 1); 

  const handleAddToCart = () => {
      addToCart(product, quantity);
  };

  const handleIncrease = () => {
    if (cartItem) {
      increase(product.id); 
    } else {
      setQuantity(prevQuantity => prevQuantity + 1); 
    }
  };

 
  const handleDecrease = () => {
    if (cartItem) {
      decrease(product.id); 
    } else if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <Link to={`/products/${product.id}`}>
        <div className="product-title">{product.name}</div>
      </Link>
      <div className="product-price">Price: ${product.price.toFixed(2)}</div>

      <div className="cart-controls">
            <div>
            <button className="decrease-btn" onClick={handleDecrease}>-</button>
              Quantity: {cartItem ? cartItem.quantity : quantity}
              <button className="increase-btn" onClick={handleIncrease}>+</button>
            </div>
            {cartItem ? (
          <>
            <div className="cart-status">This item is already in the shopping cart</div>
            <button className="cart-button remove-button" onClick={() => { removeFromCart(product.id); setQuantity(1); }}>Remove</button>
          </>
        ) : (
          <button onClick={handleAddToCart}>Add To Cart</button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
