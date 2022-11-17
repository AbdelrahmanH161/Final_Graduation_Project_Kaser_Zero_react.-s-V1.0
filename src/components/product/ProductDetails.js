import React from 'react';
import { useLocation } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import '../Styling/carosal.css';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { addToCartAction } from '../../Redux/Actions/addToCartAction';
import { axiosInstance } from '../../config/axios'
import { useEffect, useState } from 'react';
import swal from 'sweetalert';
import '../Styling/scroll.css'

function ProductDetails() {

    const productDet = useLocation().state;
    const imgsOfProd = productDet.img;

    const user = JSON.parse(localStorage.getItem("authorization"))

    const [ads, setAds] = useState([])
    
    const nav = useNavigate();
    const dispatch = useDispatch();

    function addToCart(productDet) {
        if (user) {
            axiosInstance.post(`/user/addtocart/${user}/${productDet._id}`).then((res) => { })
            dispatch(addToCartAction(productDet));
            nav(`/cart/${productDet._id}`, { state: productDet });
        }
        else{
            swal("Please Sign in or Sign Up to continue!")
        }
    };

    function gt() {
        if(user){
            axiosInstance.get(`/user/getUserAds/${user}`).then((res) => {
                setAds(res.data)
            })
        }
        else{
            swal("Please Sign in or Sign Up to continue!")
        }
    }

    function exchange(ad) {
        nav(`/exchangeProducts`, { state: [productDet, ad] })
    }

    return (
        <>
            <div className="row pt-3 my-3 justify-content-between">
                <section className="col-8 ps-2">
                    <Carousel>
                        {imgsOfProd.map((image, index) => {
                            return <div className='sliderdiv' key={index}>
                                <img className='sliderimg' alt='..' src={'http://localhost:4000/' + image} />
                                {/* <p className="legend">Legend 1</p> */}
                            </div>
                        })}
                    </Carousel>

                    <div className="border border-1 rounded-2 mt-3">
                        <div className="container py-3">
                            <h4 className="text-primary pb-3 border-bottom border-primary border-opacity-75 mb-3 ">Description</h4>
                            <div>{productDet.description}</div>
                        </div>
                    </div>
                </section>
                <section className="col-4 ps-5">
                    <div className="border border-1  rounded-2 mb-3">
                        <div className="container py-2">
                            <div className="row px-2">
                                <p className="col fs-4 text-primary fw-semibold text-start ">Title</p>
                                <p className="col fs-4 text-primary text-end ">{productDet.title}</p>
                            </div>
                            <div className="row px-2">
                                <p className="col fs-5 text-primary fw-semibold text-start ">Price</p>
                                <p className="col fs-5 text-primary text-end ">EGY {productDet.price}</p>
                            </div>
                            <div className="px-3">
                                <p className="m-0 p-0"> EGP 200 Shipping Fees Deposit</p>
                                <p className="m-0 p-0">Delivery Sun, Oct 23</p>
                                <p className="m-0 p-0"> or fastest delivery Fri, Oct 14</p>
                            </div>
                            <div className="px-4">
                                <button className="btn btn-outline-primary form-control m-2 rounded-5" href="/cart" onClick={() => addToCart(productDet)}>Add To Cart</button>
                                {productDet.ableToExchange === "true" &&
                                    <>
                                        <p className="m-0 p-0"><i className="fa-solid fa-circle-check" /> This product is replaceable</p>
                                        <button className="btn btn-outline-primary form-control m-2 rounded-5" data-bs-toggle="modal" data-bs-target="#exampleModal1" onClick={() => gt()}>Exchange</button>
                                    </>}
                            </div>
                        </div>
                    </div>
                    <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content " >
                                <div className="modal-header bg-primary">
                                    <h5 className="modal-title text-light">Choose one of your Posts</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                </div>
                                {ads.lenght !== 0 && <div className="modal-body tttt" style={{height:"70vh",overflowY:"scroll"}}>
                                    {ads.map(function (item, ix) {
                                        return <div className="item border rounded-3 p-4 shadow-sm mb-4" key={ix} onClick={() => exchange(item)} style={{ cursor: "pointer" }} data-bs-dismiss="modal" aria-label="Close">
                                            <div className="row justify-content-between p-4">
                                                <div className=" col-8">
                                                    <h4 className="mb-3">{item.title}</h4>
                                                    <h6>{item.price} EGP</h6>
                                                </div>
                                                <div className="col-4">
                                                    <img src={'http://localhost:4000/' + item.img[0]} alt={1} style={{ width: '6rem' }} />
                                                </div>
                                            </div>
                                        </div>
                                    })}
                                </div> }
                                {ads.length ===0 && 
                                <>
                                    <div className='mb-1 text-center fs-5 text-dark'>You don't have any products to exchange!</div>
                                    <div className='mb-5 text-center text-secondary'>Post some products to exchange with.</div>
                                </>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="border border-1 rounded-2">
                        <div className="container py-4 ">
                            <h4 className="text-primary pb-3 border-bottom border-primary border-opacity-75 mb-3">Details</h4>
                            <div className="row px-3 my-2 bg-light">
                                <p className="col m-0 border-start border-5 border-primary">Duration of use:</p>
                                <p className="col m-0">{productDet.durationOfUse}</p>
                            </div>
                            <div className="row px-3 my-2 bg-light">
                                <p className="col m-0 border-start border-5 border-primary">Hard size:</p>
                                <p className="col m-0">{productDet.secondFilter}</p>
                            </div>
                            <div className="row px-3 my-2 bg-light">
                                <p className="col m-0 border-start border-5 border-primary">Location:</p>
                                <p className="col m-0">{productDet.location !== "" ? `${productDet.location}` : "Unknown"}</p>
                            </div>
                            <div className="row px-3 my-2 bg-light">
                                <p className="col m-0 border-start border-5 border-primary">Color:</p>
                                <p className="col m-0">{productDet.color}</p>
                            </div>
                            <div className="row px-3 my-2 bg-light">
                                <p className="col m-0 border-start border-5 border-primary">Brand:</p>
                                <p className="col m-0">{productDet.brand}</p>
                            </div>
                            <div className="row px-3 my-2 bg-light">
                                <p className="col m-0 border-start border-5 border-primary">Ram size:</p>
                                <p className="col m-0">{productDet.firstFilter}</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default ProductDetails;