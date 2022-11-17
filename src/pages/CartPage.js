import React,{useEffect} from 'react';
import Cart from '../components/cart/Cart'

function CartPage() {
    useEffect(()=>{
        window.scrollTo(0,0)
      },[])
    return (
        <>
            <Cart></Cart>  
        </>
    );
}

export default CartPage;