import React from 'react';
import {useNavigate} from "react-router-dom";

function Side() {

    const userId=JSON.parse(localStorage.getItem("authorization"))
    const nav = useNavigate();

    function gotoprofile(){
        nav(`/myInfo/${userId}`)
    }

    function gotowishlist(){
        nav(`/myWishlist/${userId}`)
    }

    function gotocart(){
        nav(`/cart/${userId}`)
    }

    function gotomyadds(){
        nav(`/myAds/${userId}`)
    }

    return (
        <>
            <div className="col-2">
                <div className="col-2 border shadow bg-light rounded-3  ms-3 w-100">
                    <div className=" d-flex flex-column gap-4 p-5">
                        <div className="fs-5 text-decoration-none text-primary fw-bold" style={{cursor:"pointer"}} onClick={()=>gotoprofile()}>Profile</div>
                        <div className="fs-5 text-decoration-none text-primary fw-bold" style={{cursor:"pointer"}} onClick={()=>gotowishlist()}>Wishlist</div>
                        <div className="fs-5 text-decoration-none text-primary fw-bold" style={{cursor:"pointer"}} onClick={()=>gotocart()}>Cart</div>
                        <div className="fs-5 text-decoration-none text-primary fw-bold" style={{cursor:"pointer"}} onClick={()=>gotomyadds()}>Posts</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Side;