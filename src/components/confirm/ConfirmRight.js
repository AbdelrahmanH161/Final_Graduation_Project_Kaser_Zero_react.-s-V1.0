import React,{useState,useEffect} from 'react';
import {useLocation,useNavigate} from 'react-router-dom'
import axios from 'axios';
import swal from 'sweetalert';

function ConfirmRight() {
    const loc = useLocation().state
    const nav = useNavigate()
    const [usr, setUsr] = useState("")
    const [sellers, setSellers] = useState([])
    const [cartitem, setCartitems] = useState([])
    const user = JSON.parse(localStorage.getItem("authorization"))

    useEffect(() => {
        axios.get(`http://localhost:4000/user/getUser/${user}`).then((res) => {
            setUsr(res.data.address)
        })
        axios.get(`http://localhost:4000/order/sellersfromcart/${user}`).then((res) => {
            setSellers(res.data)
        })
        axios.get(`http://localhost:4000/user/cartitemsid/${user}`).then((res) => {
            setCartitems(res.data)
        })
    }, [])

    const orderData = {
        "buyerId": user,
        "sellerId": sellers,
        "cart": cartitem,
        // "productPrice": loc,
        // "profit": loc / 20,
        "shipping": 100,
        // "addressfrom":
        "addressto": usr,
        "paymentmethod": "cod",
    }

    function createOrder(){
        axios.post(`http://localhost:4000/order/createorder/${user}`,orderData).then((res) => {
            console.log(res.data)
        })
        swal("Thank you for shopping")
        nav("/home")
    }

    // function finish(){
    //     nav("/home")
    // }
    return (
        <>
            <aside className=" bg-white p-5 border border-secondary border-opacity-50 rounded-5">
                <div className="summery pb-5 border-bottom border-secondary border-opacity-50">
                    <h3 className="pb-3">Order Summary:</h3>
                    <div className="d-flex justify-content-between">
                        <div className="fw-bold">
                            <p>Items: </p>
                            <p>Shipping: </p>
                        </div>
                        <div>
                            <p>{loc} EG</p>
                            <p>100 EG</p>
                        </div>
                    </div>
                </div>
                <div className="pt-5 d-flex justify-content-between">
                    <h3>Order Total:</h3>
                    <p className="pt-1 fs-5">{loc+100} EG</p>
                </div>
                <div>
                    <button className="doprocess btn btn btn-outline-primary w-100 mt-4 mb-4 rounded-5" 
                    // data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                     style={{ fontSize: '13px', fontWeight: 600 }} onClick={createOrder}>Place Order</button>
                </div>
                {/* <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body text-center">
                                <p>Thank you for shopping</p>
                            </div>
                            <div className="modal-footer justify-content-center">
                                <button type="button" className="btn btn-outline-primary rounded-5" data-bs-dismiss="modal" onClick={()=>finish()}>Go to Home</button>
                            </div>
                        </div>
                    </div>
                </div> */}
            </aside>
        </>
    );
}

export default ConfirmRight;