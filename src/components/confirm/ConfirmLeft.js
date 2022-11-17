import React, { useEffect, useState } from 'react';
import { axiosInstance } from "../../config/axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import {useLocation} from 'react-router-dom';
import PaypalCheckout from './PaypalCheckout';

function ConfirmLeft() {
    const loc = useLocation().state
    const product = {
        price:loc,
        currency:"EGP"
    }
    const user = JSON.parse(localStorage.getItem("authorization"))
    const [usr, setUsr] = useState({})
    const [sellers, setSellers] = useState([])
    const [cartitem,setCartitems] = useState([])

    useEffect(() => {
        axiosInstance.get(`/user/getUser/${user}`).then((res) => {
            setUsr(res.data)
        })
    }, [])

    return (
        <>
            <article className="article bg-white p-5 border border-secondary border-opacity-50 rounded-5">
                <div className="shippinginfo">
                    <h3 className="pb-3">Process info</h3>
                    <div className="struct d-flex justify-content-between pb-5 border-bottom border-secondary border-opacity-50">
                        <div className="title fw-bold">
                            <p className="buyer">Buyer: </p>
                            <p className="kind">Kind of process: </p>
                            <p className="address">Address of shipping: </p>
                        </div>
                        <div className="info">
                            <p>{usr.userName}</p>
                            <p>Selling</p>
                            <p>{usr.address?.city}</p>
                        </div>
                    </div>
                </div>
                <div className="payment pt-5">
                    <h3 className="pb-3">Payment method</h3>
                    <div className='paypal'>
                        <div className='paypal-button-container'>
                            <PaypalCheckout cart={product}></PaypalCheckout>
                        </div>
                    </div>
                </div>
            </article>
        </>
    );
}
export default ConfirmLeft;