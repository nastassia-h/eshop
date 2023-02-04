import React, { useRef } from 'react'
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti'
import { toast } from 'react-hot-toast';
import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';
import getStripe from '../lib/getStripe';

const Cart = () => {
   const cartRef = useRef();
   const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuantity, removeCartItem } = useStateContext();

   // const handleCheckout = async () => {
   //    const stripe = await getStripe();

   //    const response = await fetch('/api/stripe', {
   //       method: 'POST',
   //       headers: {
   //          'Content-Type': 'application/json',
   //       },
   //       body: JSON.stringify(cartItems),
   //    });

   //    if (response.statusCode === 500) return;

   //    const data = await response.json();
   //    toast.loading('Redirecting...');

   //    stripe.redirectToCheckout({ sessionId: data.id });
   // }

   return (
      <div className='cart-wrapper' ref={cartRef}>
         <div className='cart-container'>
            <button type='button'
               className='cart-heading'
               onClick={() => setShowCart(false)}
            >
               <AiOutlineLeft />
               <span className='heading'>Your Cart</span>
               <span className='cart-num-items'>({totalQuantities}) items</span>
            </button>

            {cartItems.length < 1 && (
               <div className='empty-cart'>
                  <AiOutlineShopping size={150} />
                  <h3>Your shopping cart is empty</h3>
                  <Link href='/'>
                     <button
                        tupe='button'
                        onClick={() => setShowCart(false)}
                        className='btn'
                     >
                        Continue Shopping!
                     </button>
                  </Link>
               </div>
            )}

            <div className='product-container'>
               {cartItems.length >= 1 && cartItems.map(product =>
                  <div className='product' key={product._id}>
                     <img src={urlFor(product?.image[0])} alt="" className='cart-product-image' />
                     <div className='item-desc'>
                        <div className='flex-top'>
                           <h5>{product.name}</h5>
                           <h4>{product.price}</h4>
                        </div>
                        <div className='flex bottom'>
                           <div>
                              <p className='quantity-desc'>
                                 <span className='minus'
                                    onClick={() => toggleCartItemQuantity(product._id, -1)}>
                                    <AiOutlineMinus />
                                 </span>
                                 <span className='num'
                                    onClick=''>
                                    {product.quantity}
                                 </span>
                                 <span className='plus'
                                    onClick={() => toggleCartItemQuantity(product._id, 1)}>
                                    <AiOutlinePlus />
                                 </span>
                              </p>
                           </div>
                           <button
                              type='button'
                              className='remove-item'
                              onClick={() => removeCartItem(product._id)}
                           >
                              <TiDeleteOutline />
                           </button>
                        </div>
                     </div>
                  </div>
               )}
            </div>
            {cartItems.length >= 1 && (
               <div className='cart-bottom'>
                  <div className='total'>
                     <h3>Subtotal:</h3>
                     <h3>${totalPrice}</h3>
                  </div>
                  <div className='btn-container'>
                     <Link href='/success'>
                        <button type='button' className='btn'>
                           Pay with Stripe
                        </button>
                     </Link>
                  </div>
               </div>
            )}
         </div>
      </div>
   )
}

export default Cart