import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
   const [showCart, setShowCart] = useState(false);
   const [totalPrice, setTotalPrice] = useState(0);
   const [cartItems, setCartItems] = useState([]);
   const [totalQuantities, setTotalQuantities] = useState(0);
   const [qty, setQty] = useState(1);

   let foundProduct = {};
   let index = 0;

   const incQty = () => {
      setQty((prevQty) => prevQty + 1)
   }

   const decQty = () => {
      setQty((prevQty) => {
         if (prevQty - 1 < 1) return 1;
         return prevQty - 1;
      });
   }

   const onAdd = (product, quantity) => {
      const checkProductInCart = cartItems.find(item => item._id === product._id);
      setTotalPrice((prevPrice) => prevPrice + product.price * quantity);
      setTotalQuantities((prevQuatities) => prevQuatities + quantity);

      if (checkProductInCart) {
         const updatedCartItems = cartItems.map((item) => {
            if (item._id === product._id) return { ...item, quantity: item.quantity + quantity }
         })
         setCartItems(updatedCartItems);
      } else {
         product.quantity = quantity;
         setCartItems([...cartItems, { ...product }])
      }
      toast.success(`${qty} ${product.name} added to the cart.`)
   }

   const toggleCartItemQuantity = (id, quantity) => {
      foundProduct = cartItems.find(item => item._id === id)
      index = cartItems.findIndex(item => item._id === id)
      const newCartItems = cartItems.filter(item => item._id !== id)


      if (quantity < 0 && foundProduct.quantity > 1 || quantity > 0) {
         setTotalPrice((prevPrice) => prevPrice + foundProduct.price * quantity);
         setTotalQuantities((prevQuatities) => prevQuatities + quantity);
         setCartItems([...newCartItems.slice(0, index), { ...foundProduct, quantity: foundProduct.quantity + quantity }, ...newCartItems.slice(index)])
      }
   }

   const removeCartItem = (id) => {
      foundProduct = cartItems.find(item => item._id === id)
      setTotalPrice((prevPrice) => prevPrice - foundProduct.price * foundProduct.quantity);
      setTotalQuantities((prevQuatities) => prevQuatities - foundProduct.quantity);
      setCartItems(cartItems.filter(item => item._id !== id));
   }

   return (
      <Context.Provider
         value={{
            showCart,
            cartItems,
            totalPrice,
            totalQuantities,
            qty,
            incQty,
            decQty,
            onAdd,
            setShowCart,
            toggleCartItemQuantity,
            removeCartItem,
            setCartItems,
            setTotalPrice,
            setTotalQuantities
         }}
      >
         {children}
      </Context.Provider>
   )
}

export const useStateContext = () => useContext(Context);