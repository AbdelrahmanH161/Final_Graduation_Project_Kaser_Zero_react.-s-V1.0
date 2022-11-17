import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { axiosInstance } from "../../config/axios";
import "../exchange_products_page/components/ProductCard.css";

function Cards(props) {
    console.log(props)
  // const [product, setProduct] = useState({
  //   data: {
  //     ableToExchange: false,
  //     brand: "",
  //     categoryId: "",
  //     color: "",
  //     description: "",
  //     durationOfUse: "",
  //     firstFilter: "",
  //     img: [],
  //     price: 0,
  //     secondFilter: "",
  //     status: "pending",
  //     thirdFilter: "",
  //     time: "",
  //     title: "",
  //     userId: "",
  //     _id: "",
  //   },
  //   category: {
  //     firstFilter: {},
  //     secondFilter: {},
  //     thirdFilter: {},
  //   },
  // });

  // useEffect(() => {
  //   getProduct();
  // }, []);

  // async function getProduct() {
  //   await axiosInstance
  //     .get(`product/getProduct/${props.productId}`)
  //     .then((res) => {
  //       console.log(res);
  //       setProduct(res.data);

  //       // console.log(product.data.title)
  //     })
  //     .catch((err) => console.log("Error"));
  // }
  
  return (
    <div className="row gap-5">
      <div className="col">
        <h3 className="mb-3">Wanted Product</h3>
        {/* <article className="card mx-0 w-100">
          <div className="row">
            <p className="col fs-5">{props.myItem.title}</p>
            <p className="col-3 me-3 text-center p-1 fw-bold  rounded-2 border border-primary text-primary fs-5">
              {props.myItem.price} EGP
            </p>
          </div>
          <div className="container w-100 h-100 rounded-2 border py-2 my-2 bg-black">
            <Carousel fade interval={null} style={{ height: "300px" }}>
              {props.myItem.img.map((img,ix) => (
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
                {props.myItem.categoryId === "6363b2908a17142dd3e7e8a6" && "Country"} {props.myItem.categoryId !== "6363b2908a17142dd3e7e8a6" && "Brand"}
              </div>
              <div className="col">{props.myItem.brand}</div>
            </div>
            <div className="row mb-2 bg-light">
              <div className="col-6 border-start border-5 border-primary">
                Color:
              </div>
              <div className="col">{props.myItem.color}</div>
            </div>
            <div className="row mb-2 bg-light">
              <div className="col-6 border-start border-5 border-primary">
                Duration of use:
              </div>
              <div className="col">{props.myItem.durationOfUse}</div>
            </div>
            <div className="row mb-2 bg-light">
              <div className="col-6 border-start border-5 border-primary">
                {props.myItem.categoryId === "6363b2908a17142dd3e7e8a6" && "Type"} {props.myItem.categoryId === "6363b2908a17142dd3e7e8ab" && "Type"} {props.myItem.categoryId === "6363b2908a17142dd3e7e8a9" && "OS"} {props.myItem.categoryId === "6363b2908a17142dd3e7e8a7" && "Storage Area"} {props.myItem.categoryId === "6363b2908a17142dd3e7e8a8" && "Hard Storage Area"} {props.myItem.categoryId === "6363b2908a17142dd3e7e8aa" && "Storage Area"}
              </div>
              <div className="col">{props.myItem.firstFilter}</div>
            </div>

            <div className="row mb-2 bg-light">
              <div className="col-6 border-start border-5 border-primary ">
                {props.myItem.categoryId === "6363b2908a17142dd3e7e8a6" && "Lengths"} {props.myItem.categoryId === "6363b2908a17142dd3e7e8ab" && "Material"} {props.myItem.categoryId === "6363b2908a17142dd3e7e8a9" && "Type of Storage"} {props.myItem.categoryId === "6363b2908a17142dd3e7e8a7" && "RAM Size"} {props.myItem.categoryId === "6363b2908a17142dd3e7e8a8" && "RAM Size"} {props.myItem.categoryId === "6363b2908a17142dd3e7e8aa" && "Resolution"}
              </div>
              <div className="col">{props.myItem.secondFilter}</div>
            </div>

            <div className="row mb-2 bg-light">
              <div className="col-6 border-start border-5 border-primary">
                {props.myItem.categoryId === "6363b2908a17142dd3e7e8a6" && "Widths"} {props.myItem.categoryId === "6363b2908a17142dd3e7e8ab" && "Size"} {props.myItem.categoryId === "6363b2908a17142dd3e7e8a9" && "Accessories"} {props.myItem.categoryId === "6363b2908a17142dd3e7e8a7" && "SIM Card"} {props.myItem.categoryId === "6363b2908a17142dd3e7e8a8" && "Processor"} {props.myItem.categoryId === "6363b2908a17142dd3e7e8aa" && "Camera lens"}
              </div>
              <div className="col">{props.myItem.thirdFilter}</div>
            </div>
          </div>
          <p className="fs-5 mt-3">Description</p>
          <p className="fs-6 fw-normal border border-2 rounded-2 p-2">
            {props.myItem.description}
          </p>
        </article> */}
      </div>

      <div className="col">
        <h3 className="mb-3">Offered Product</h3>
         {/* <article className="card mx-0 w-100">
          <div className="row">
            <p className="col fs-5">{props.productId.title}</p>
            <p className="col-3 me-3 text-center p-1 fw-bold  rounded-2 border border-primary text-primary fs-5">
              {props.productId.price} EGP
            </p>
          </div>
          <div className="container w-100 h-100 rounded-2 border py-2 my-2 bg-black">
            <Carousel fade interval={null} style={{ height: "300px" }}>
              {props.productId.img.map((img,ix) => (
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
                {props.wantedproductdata.categoryId === "6363b2908a17142dd3e7e8a6" && "Country"} {props.wantedproductdata.categoryId !== "6363b2908a17142dd3e7e8a6" && "Brand"}
              </div>
              <div className="col">{props.productId.brand}</div>
            </div>
            <div className="row mb-2 bg-light">
              <div className="col-6 border-start border-5 border-primary">
                Color:
              </div>
              <div className="col">{props.productId.color}</div>
            </div>
            <div className="row mb-2 bg-light">
              <div className="col-6 border-start border-5 border-primary">
                Duration of use:
              </div>
              <div className="col">{props.productId.durationOfUse}</div>
            </div>
            <div className="row mb-2 bg-light">
              <div className="col-6 border-start border-5 border-primary">
                {props.productId.categoryId === "6363b2908a17142dd3e7e8a6" && "Type"} {props.productId.categoryId === "6363b2908a17142dd3e7e8ab" && "Type"} {props.productId.categoryId === "6363b2908a17142dd3e7e8a9" && "OS"} {props.productId.categoryId === "6363b2908a17142dd3e7e8a7" && "Storage Area"} {props.productId.categoryId === "6363b2908a17142dd3e7e8a8" && "Hard Storage Area"} {props.productId.categoryId === "6363b2908a17142dd3e7e8aa" && "Storage Area"}
              </div>
              <div className="col">{props.productId.firstFilter}</div>
            </div>

            <div className="row mb-2 bg-light">
              <div className="col-6 border-start border-5 border-primary ">
                {props.productId.categoryId === "6363b2908a17142dd3e7e8a6" && "Lengths"} {props.productId.categoryId === "6363b2908a17142dd3e7e8ab" && "Material"} {props.productId.categoryId === "6363b2908a17142dd3e7e8a9" && "Type of Storage"} {props.productId.categoryId === "6363b2908a17142dd3e7e8a7" && "RAM Size"} {props.productId.categoryId === "6363b2908a17142dd3e7e8a8" && "RAM Size"} {props.productId.categoryId === "6363b2908a17142dd3e7e8aa" && "Resolution"}
              </div>
              <div className="col">{props.productId.secondFilter}</div>
            </div>

            <div className="row mb-2 bg-light">
              <div className="col-6 border-start border-5 border-primary">
                {props.productId.categoryId === "6363b2908a17142dd3e7e8a6" && "Widths"} {props.productId.categoryId === "6363b2908a17142dd3e7e8ab" && "Size"} {props.productId.categoryId === "6363b2908a17142dd3e7e8a9" && "Accessories"} {props.productId.categoryId === "6363b2908a17142dd3e7e8a7" && "SIM Card"} {props.productId.categoryId === "6363b2908a17142dd3e7e8a8" && "Processor"} {props.productId.categoryId === "6363b2908a17142dd3e7e8aa" && "Camera lens"}
              </div>
              <div className="col">{props.productId.thirdFilter}</div>
            </div>
          </div>
          <p className="fs-5 mt-3">Description</p>
          <p className="fs-6 fw-normal border border-2 rounded-2 p-2">
            {props.productId.description}
          </p>
        </article> */}
      </div>
    </div>
  );
}

export default Cards;
