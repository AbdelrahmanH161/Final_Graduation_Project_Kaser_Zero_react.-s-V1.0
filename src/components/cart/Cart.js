import React, { useState,useEffect } from 'react';
import CartContent from './CartContent';
import CartPrice from './CartPrice';
import Side from '../Side';
import { useSelector } from 'react-redux';
import { axiosInstance } from '../../config/axios';

function Cart() {

    const [cartitem,setCartitems] = useState([])
    const user=JSON.parse(localStorage.getItem("authorization"))

    useEffect(()=>{
        axiosInstance.get(`user/cartitems/${user}`).then((res)=>{
            setCartitems(res.data)
        })
    },[])

    const cartList = useSelector(state => state.cart);

    const view = [...cartitem]

    let price= view.reduce((tot,itm)=>tot+itm.price ,0)   
    
    return (
        <>
            <div className="me-0 row mt-3 ">
                <Side></Side>
                <div className="col-9">
                    <div className="d-md-flex justify-content-between gap-4 mb-5 ms-5  me-5">
                        <CartContent data={cartList} old={cartitem} ></CartContent>
                        <CartPrice data={price}></CartPrice>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Cart;