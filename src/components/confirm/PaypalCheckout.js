import React, { useState, useEffect } from 'react'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import swal from 'sweetalert';
import { useNavigate, useLocation } from 'react-router-dom'
import { axiosInstance } from '../../config/axios';
import axios from 'axios';

function PaypalCheckout(props) {
    const product = props.cart
    // const [usr, setUsr] = useState("")
    // const [sellers, setSellers] = useState([])
    // const [cartitem, setCartitems] = useState([])
    const user = JSON.parse(localStorage.getItem("authorization"))
    const nav = useNavigate()
    const [paid, setPaid] = useState(false)
    const [error, setError] = useState(null)
    const loc = useLocation().state
    useEffect(() => {
        axios.get(`http://localhost:4000/user/getUser/${user}`).then((res) => {
            sessionStorage.setItem("usr",JSON.stringify(res.data.address))
            // setUsr(res.data.address)
        })
        axios.get(`http://localhost:4000/order/sellersfromcart/${user}`).then((res) => {
            sessionStorage.setItem("sellers",JSON.stringify(res.data))
            // setSellers(res.data)
        })
        axios.get(`http://localhost:4000/user/cartitemsid/${user}`).then((res) => {
            sessionStorage.setItem("cartitem",JSON.stringify(res.data))
            // setCartitems(res.data)
        })
    }, [])

    const sellers = JSON.parse(sessionStorage.getItem("sellers"))
    const cartitem = JSON.parse(sessionStorage.getItem("sellers"))
    const usr = JSON.parse(sessionStorage.getItem("usr"))
    const handleApprove = async (orderID) => {
        setPaid(true);
        await axios.post(`http://localhost:4000/order/createorder/${user}`,
            {
                "buyerId": user,
                "sellerId": JSON.parse(sessionStorage.getItem("sellers")),
                "cart": JSON.parse(sessionStorage.getItem("cartitem")),
                // "productPrice": loc,
                // "profit": loc / 20,
                "shipping": 100,
                // "addressfrom":
                "addressto": JSON.parse(sessionStorage.getItem("usr")),
                "paymentmethod": "credit",
            }
        ).then((res) => {
            console.log("orderData")
        })
    }
    if (paid) {
        swal("Purchase Succeeded!");
        nav("/home")
    }
    if (error) {
        swal("An Error Occured!")
    }

    return <PayPalButtons className='mx-5' style={{ color: "silver", layout: "horizontal", tagline: false, shape: "pill", }}
        onClick={(data, actions) => {
            const hasAlreadyBought = false
            if (hasAlreadyBought) {
                setError("You have already bought this cart!")
                return actions.reject()
            }
            else {
                return actions.resolve()

            }
        }}
        createOrder={(data, actions) => {
            return actions.order.create({
                purchase_units: [
                    {
                        amount: {
                            value: product.price,
                            currency: product.currency
                        }
                    }
                ]
            })
        }}
        onApprove={async (data, actions) => {
            let order = await actions.order.capture()
            console.log("order", order);
            handleApprove(data.orderID);
        }}
        onError={(err) => {
            setError(err)
            console.error("paypal error", err)
        }}
        onCancel={() => { }}
    />
}

export default PaypalCheckout