import React, { useEffect, useState } from "react";
import "../exchange_products_page/ExchangeProducts.css";
// import Sidebar from "./components/Sidebar";
import Cards from "./Cards";
import { useLocation, useNavigate } from 'react-router-dom'
// import "./components/Sidebar.css";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import { Container } from "react-bootstrap";
import { axiosInstance } from "../../config/axios";
import Carousel from "react-bootstrap/Carousel";
import axios from 'axios'
import swal from "sweetalert";

function ExchangeProducts(props) {
  const mine = useLocation().state
  const [offrs, setOffrs] = useState([])
  const nav = useNavigate()
  const [usr, setUsr] = useState({})
  const [usrsec, setUsrsec] = useState({})
  const [sellers, setSellers] = useState([])
  const [cartitem, setCartitems] = useState({})
  const user = JSON.parse(localStorage.getItem("authorization"))

  useEffect(() => {
    window.scrollTo(0,0)
    axiosInstance.get(`/product/getoffers/${mine._id}`).then((res) => {
      setOffrs(res.data)
    })
    axios.get(`http://localhost:4000/user/getUser/${user}`).then((res) => {
      setUsr(res.data.address)
      console.log(res.data)
    })
  }, []);

  function setoffer(offer){
    axios.get(`http://localhost:4000/user/getUser/${offer.userId}`).then((res) => {
      setUsrsec(res.data.address)
      console.log(res.data)
    })
    setCartitems(offer)
  }
  
  function exorder() {
    const orderData = {
      "exchangable":true,
      "buyerId": user,
      "sellerId": cartitem.userId,
      // "firstProductId":mine._id,
      "productId": mine._id,
      // "firstProductPrice":mine.price,
      "productPrice":mine.price,
      // "orderPrice": mine.price-mine.price,
      "profit": mine.price/20,
      "shipping": 100,
      "addressfrom": usrsec,
      "addressto":usr,
      "paymentmethod": "cod",
      "exchangeProperties":{
        "productId":cartitem._id,
        "productPrice":cartitem.price,
        "profit":cartitem.price/20,
        "shipping": 100,
        "paymentmethod": "cod",
      }
    }
    axios.post(`http://localhost:4000/order/exchangecreateorder/${user}/${cartitem.userId}`, orderData).then((res) => {
      console.log(res.data)
    })
    swal("Offer accepted!")
    nav("/home")
  }

  function productDetails(data) {
    nav("/product", { state: data })
  }

  return (
    <Container fluid>
      <Row className="container-fluid px-0 px-0 py-3 d-flex my-4">
        <Col>
          <Tab.Container id="list-group-tabs-example" defaultActiveKey={"#" + mine[0]}>
            <Row>
              <Container style={{ margin: 0, width: "18vw" }}>
                <h3 className="fs-5 text-center py-4 mb-3 border border-primary text-primary rounded-2 border-2">
                  Exchanging Offers
                </h3>
                <Container
                  className="overflow-auto w-100 px-0 rounded"
                  style={{ maxHeight: "55vh" }}
                >
                  <ListGroup
                    className="list-group w-100 m-0 p-0"
                    as="ol"
                    numbered
                  >
                    {offrs.map((offer, index) => (
                      <ListGroup.Item key={index}
                        className="px-2"
                        style={{ cursor: "pointer" }}
                        as="li"
                        action
                        href={"#" + offer}
                        onClick={()=>setoffer(offer)}
                      >
                        {offer.title}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Container>
                <button
                  type="button"
                  className="btn btn-outline-primary w-100 my-3 rounded-5"
                  onClick={exorder}
                >
                  Accept This Offer
                </button>
              </Container>
              <Container style={{ width: "39vw" }}>
                <Tab.Content>
                  {offrs.map((offer, index) => (
                    <Tab.Pane eventKey={"#" + offer} key={index}>
                      <h3 className="mb-3">Offered Product</h3>
                      <article className="card mx-0 w-100">
                        <div className="row">
                          <p className="col fs-5" onClick={() => productDetails(offer)} style={{ cursor: "pointer" }}>{offer.title}</p>
                          <p className="col-3 me-3 text-center p-1 fw-bold  rounded-2 border border-primary text-primary fs-5">
                            {offer.price} EGP
                          </p>
                        </div>
                        <div className="container w-100 h-100 rounded-2 border py-2 my-2 bg-black">
                          <Carousel fade interval={null} style={{ height: "300px" }}>
                            {offer.img.map((img, ix) => (
                              <Carousel.Item className="d-flex justify-content-center" key={ix}>
                                <img
                                  className="d-block"
                                  src={`http://localhost:4000/${img}`}
                                  alt={"productId images"}
                                />
                              </Carousel.Item>
                            ))}
                          </Carousel>
                        </div>
                        <p className="fs-5 mt-3">Details</p>
                        <div className="container text-capitalize">
                          <div className="row mb-2 bg-light">
                            <div className="col-6 border-start border-5 border-primary">
                              {offer.categoryId === "63734f55c969d1ab1fd73b6f" && "Country"} {offer.categoryId !== "63734f55c969d1ab1fd73b6f" && "Brand"}
                            </div>
                            <div className="col">{offer.brand}</div>
                          </div>
                          <div className="row mb-2 bg-light">
                            <div className="col-6 border-start border-5 border-primary">
                              Color:
                            </div>
                            <div className="col">{offer.color}</div>
                          </div>
                          <div className="row mb-2 bg-light">
                            <div className="col-6 border-start border-5 border-primary">
                              Duration of use:
                            </div>
                            <div className="col">{offer.durationOfUse}</div>
                          </div>
                          <div className="row mb-2 bg-light">
                            <div className="col-6 border-start border-5 border-primary">
                              {offer.categoryId === "63734f55c969d1ab1fd73b6f" && "Type"} {offer.categoryId === "63734f55c969d1ab1fd73b74" && "Type"} {offer.categoryId === "63734f55c969d1ab1fd73b72" && "OS"} {offer.categoryId === "6363b2908a17142dd3e7e8a7" && "Storage Area"} {offer.categoryId === "6363b2908a17142dd3e7e8a8" && "Hard Storage Area"} {offer.categoryId === "6363b2908a17142dd3e7e8aa" && "Storage Area"}
                            </div>
                            <div className="col">{offer.firstFilter}</div>
                          </div>

                          <div className="row mb-2 bg-light">
                            <div className="col-6 border-start border-5 border-primary ">
                              {offer.categoryId === "63734f55c969d1ab1fd73b6f" && "Lengths"} {offer.categoryId === "63734f55c969d1ab1fd73b74" && "Material"} {offer.categoryId === "63734f55c969d1ab1fd73b72" && "Type of Storage"} {offer.categoryId === "6363b2908a17142dd3e7e8a7" && "RAM Size"} {offer.categoryId === "6363b2908a17142dd3e7e8a8" && "RAM Size"} {offer.categoryId === "6363b2908a17142dd3e7e8aa" && "Resolution"}
                            </div>
                            <div className="col">{offer.secondFilter}</div>
                          </div>

                          <div className="row mb-2 bg-light">
                            <div className="col-6 border-start border-5 border-primary">
                              {offer.categoryId === "63734f55c969d1ab1fd73b6f" && "Widths"} {offer.categoryId === "63734f55c969d1ab1fd73b74" && "Size"} {offer.categoryId === "63734f55c969d1ab1fd73b72" && "Accessories"} {offer.categoryId === "6363b2908a17142dd3e7e8a7" && "SIM Card"} {offer.categoryId === "6363b2908a17142dd3e7e8a8" && "Processor"} {offer.categoryId === "6363b2908a17142dd3e7e8aa" && "Camera lens"}
                            </div>
                            <div className="col">{offer.thirdFilter}</div>
                          </div>
                        </div>
                        <p className="fs-5 mt-3">Description</p>
                        <p className="fs-6 fw-normal border border-2 rounded-2 p-2">
                          {offer.description}
                        </p>
                      </article>
                    </Tab.Pane>
                  ))}
                </Tab.Content>
              </Container>
            </Row>
          </Tab.Container>
        </Col>
        <Container style={{ width: "39vw" }}>
          <h3 className="mb-3">Your Product</h3>
          <article className="card mx-0 w-100">
            <div className="row">
              <p className="col fs-5">{mine.title}</p>
              <p className="col-3 me-3 text-center p-1 fw-bold  rounded-2 border border-primary text-primary fs-5">
                {mine.price} EGP
              </p>
            </div>
            <div className="container w-100 h-100 rounded-2 border py-2 my-2 bg-black">
              <Carousel fade interval={null} style={{ height: "300px" }}>
                {mine.img.map((img, ix) => (
                  <Carousel.Item className="d-flex justify-content-center" key={ix}>
                    <img
                      className="d-block"
                      src={`http://localhost:4000/${img}`}
                      alt={"myItem images"}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
            <p className="fs-5 mt-3">Details</p>
            <div className="container text-capitalize">
              <div className="row mb-2 bg-light">
                <div className="col-6 border-start border-5 border-primary">
                  {mine.categoryId === "63734f55c969d1ab1fd73b6f" && "Country"} {mine.categoryId !== "63734f55c969d1ab1fd73b6f" && "Brand"}
                </div>
                <div className="col">{mine.brand}</div>
              </div>
              <div className="row mb-2 bg-light">
                <div className="col-6 border-start border-5 border-primary">
                  Color:
                </div>
                <div className="col">{mine.color}</div>
              </div>
              <div className="row mb-2 bg-light">
                <div className="col-6 border-start border-5 border-primary">
                  Duration of use:
                </div>
                <div className="col">{mine.durationOfUse}</div>
              </div>
              <div className="row mb-2 bg-light">
                <div className="col-6 border-start border-5 border-primary">
                  {mine.categoryId === "63734f55c969d1ab1fd73b6f" && "Type"} {mine.categoryId === "63734f55c969d1ab1fd73b74" && "Type"} {mine.categoryId === "63734f55c969d1ab1fd73b72" && "OS"} {mine.categoryId === "6363b2908a17142dd3e7e8a7" && "Storage Area"} {mine.categoryId === "6363b2908a17142dd3e7e8a8" && "Hard Storage Area"} {mine.categoryId === "6363b2908a17142dd3e7e8aa" && "Storage Area"}
                </div>
                <div className="col">{mine.firstFilter}</div>
              </div>

              <div className="row mb-2 bg-light">
                <div className="col-6 border-start border-5 border-primary ">
                  {mine.categoryId === "63734f55c969d1ab1fd73b6f" && "Lengths"} {mine.categoryId === "63734f55c969d1ab1fd73b74" && "Material"} {mine.categoryId === "63734f55c969d1ab1fd73b72" && "Type of Storage"} {mine.categoryId === "6363b2908a17142dd3e7e8a7" && "RAM Size"} {mine.categoryId === "6363b2908a17142dd3e7e8a8" && "RAM Size"} {mine.categoryId === "6363b2908a17142dd3e7e8aa" && "Resolution"}
                </div>
                <div className="col">{mine.secondFilter}</div>
              </div>

              <div className="row mb-2 bg-light">
                <div className="col-6 border-start border-5 border-primary">
                  {mine.categoryId === "63734f55c969d1ab1fd73b6f" && "Widths"} {mine.categoryId === "63734f55c969d1ab1fd73b74" && "Size"} {mine.categoryId === "63734f55c969d1ab1fd73b72" && "Accessories"} {mine.categoryId === "6363b2908a17142dd3e7e8a7" && "SIM Card"} {mine.categoryId === "6363b2908a17142dd3e7e8a8" && "Processor"} {mine.categoryId === "6363b2908a17142dd3e7e8aa" && "Camera lens"}
                </div>
                <div className="col">{mine.thirdFilter}</div>
              </div>
            </div>
            <p className="fs-5 mt-3">Description</p>
            <p className="fs-6 fw-normal border border-2 rounded-2 p-2">
              {mine.description}
            </p>
          </article>
        </Container>
      </Row>
    </Container>

  );
}

export default ExchangeProducts;
