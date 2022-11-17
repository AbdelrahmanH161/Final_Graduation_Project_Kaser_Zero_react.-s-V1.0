import React, { useEffect } from "react";
import "./ExchangeProducts.css";
// import Sidebar from "./components/Sidebar";
import ProductCard from "./components/ProductCard";
import { useLocation, useNavigate } from 'react-router-dom'
// import "./components/Sidebar.css";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import { Container } from "react-bootstrap";
import axios from "axios";
import { axiosInstance } from "../../config/axios";
import swal from "sweetalert";

function ExchangeProducts(props) {
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])
  const wantedproduct = useLocation().state[0]
  const offeredproduct = useLocation().state[1]
  const nav = useNavigate();

  function addOffer() {
    axiosInstance.post(`/product/sendoffer/${wantedproduct._id}/${offeredproduct._id}`).then((res) => {
      console.log(res)
    })
    swal("Offer has been sent. Please wait the reply.")
    nav("/home")
  }
  // function leave() {
  //   nav("/home")
  // }

  return (
    <Container fluid>
      <Container className="container-fluid px-0 px-0 py-3 d-flex justify-content-center my-4">
        <Container className="w-100">
          <ProductCard offeredproductdata={offeredproduct} wantedproductdata={wantedproduct} />
        </Container>
      </Container>
      <div className="text-center">
        <button className="btn btn-primary m-5 px-5 rounded-5 w-25 fs-5 text-white" onClick={() => addOffer()} 
        // data-bs-toggle="modal" data-bs-target="#offer"
        >Send Offer</button>
      </div>
      {/* <div className="modal fade" id="offer" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body text-center">
              Offer has been sent. Please wait the reply.
            </div>
            <div className="modal-footer justify-content-center">
              <button type="button" className="btn btn-outline-primary rounded-5 px-4" data-bs-dismiss="modal" onClick={leave}>Ok</button>
            </div>
          </div>
        </div>
      </div> */}
    </Container>

  );
}

export default ExchangeProducts;
