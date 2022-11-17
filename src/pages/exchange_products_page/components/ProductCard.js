import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { axiosInstance } from "../../../config/axios";
import "./ProductCard.css";

function ProductCard(props) {

  return (
    <div className="d-flex justify-content-evenly row gap-5">
      <div className="col-5">
        <h3 className="mb-3">Wanted Product</h3>
        <article className="card mx-0 w-100">
          <div className="row">
            <p className="col fs-5">{props.wantedproductdata.title}</p>
            <p className="col-3 me-3 text-center p-1 fw-bold  rounded-2 border border-primary text-primary fs-5">
              {props.wantedproductdata.price} EGP
            </p>
          </div>
          <div className="container w-100 h-100 rounded-2 border py-2 my-2 bg-black">
            <Carousel fade interval={null} style={{ height: "300px" }}>
              {props.wantedproductdata.img.map((img,ix) => (
                <Carousel.Item className="d-flex justify-content-center" key={ix}>
                  <img
                    className="d-block"
                    src={`http://localhost:4000/${img}`}
                    alt={"wantedproductdata images"}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
          <p className="fs-5 mt-3">Details</p>
          <div className="container text-capitalize">
            <div className="row mb-2 bg-light">
              <div className="col-6 border-start border-5 border-primary">
                {props.wantedproductdata.categoryId === "63734f55c969d1ab1fd73b6f" && "Country"} {props.wantedproductdata.categoryId !== "63734f55c969d1ab1fd73b6f" && "Brand"}
              </div>
              <div className="col">{props.wantedproductdata.brand}</div>
            </div>
            <div className="row mb-2 bg-light">
              <div className="col-6 border-start border-5 border-primary">
                Color:
              </div>
              <div className="col">{props.wantedproductdata.color}</div>
            </div>
            <div className="row mb-2 bg-light">
              <div className="col-6 border-start border-5 border-primary">
                Duration of use:
              </div>
              <div className="col">{props.wantedproductdata.durationOfUse}</div>
            </div>
            <div className="row mb-2 bg-light">
              <div className="col-6 border-start border-5 border-primary">
                {props.wantedproductdata.categoryId === "63734f55c969d1ab1fd73b6f" && "Type"} {props.wantedproductdata.categoryId === "63734f55c969d1ab1fd73b74" && "Type"} {props.wantedproductdata.categoryId === "63734f55c969d1ab1fd73b72" && "OS"} {props.wantedproductdata.categoryId === "6363b2908a17142dd3e7e8a7" && "Storage Area"} {props.wantedproductdata.categoryId === "6363b2908a17142dd3e7e8a8" && "Hard Storage Area"} {props.wantedproductdata.categoryId === "6363b2908a17142dd3e7e8aa" && "Storage Area"}
              </div>
              <div className="col">{props.wantedproductdata.firstFilter}</div>
            </div>

            <div className="row mb-2 bg-light">
              <div className="col-6 border-start border-5 border-primary ">
                {props.wantedproductdata.categoryId === "63734f55c969d1ab1fd73b6f" && "Lengths"} {props.wantedproductdata.categoryId === "63734f55c969d1ab1fd73b74" && "Material"} {props.wantedproductdata.categoryId === "63734f55c969d1ab1fd73b72" && "Type of Storage"} {props.wantedproductdata.categoryId === "6363b2908a17142dd3e7e8a7" && "RAM Size"} {props.wantedproductdata.categoryId === "6363b2908a17142dd3e7e8a8" && "RAM Size"} {props.wantedproductdata.categoryId === "6363b2908a17142dd3e7e8aa" && "Resolution"}
              </div>
              <div className="col">{props.wantedproductdata.secondFilter}</div>
            </div>

            <div className="row mb-2 bg-light">
              <div className="col-6 border-start border-5 border-primary">
                {props.wantedproductdata.categoryId === "63734f55c969d1ab1fd73b6f" && "Widths"} {props.wantedproductdata.categoryId === "63734f55c969d1ab1fd73b74" && "Size"} {props.wantedproductdata.categoryId === "63734f55c969d1ab1fd73b72" && "Accessories"} {props.wantedproductdata.categoryId === "6363b2908a17142dd3e7e8a7" && "SIM Card"} {props.wantedproductdata.categoryId === "6363b2908a17142dd3e7e8a8" && "Processor"} {props.wantedproductdata.categoryId === "6363b2908a17142dd3e7e8aa" && "Camera lens"}
              </div>
              <div className="col">{props.wantedproductdata.thirdFilter}</div>
            </div>
          </div>
          <p className="fs-5 mt-3">Description</p>
          <p className="fs-6 fw-normal border border-2 rounded-2 p-2">
            {props.wantedproductdata.description}
          </p>
        </article>
      </div>

      <div className="col-5">
        <h3 className="mb-3">Offered Product</h3>
        <article className="card mx-0 w-100">
          <div className="row">
            <p className="col fs-5">{props.offeredproductdata.title}</p>
            <p className="col-3 me-3 text-center p-1 fw-bold  rounded-2 border border-primary text-primary fs-5">
              {props.offeredproductdata.price} EGP
            </p>
          </div>
          <div className="container w-100 h-100 rounded-2 border py-2 my-2 bg-black">
            <Carousel fade interval={null} style={{ height: "300px" }}>
              {props.offeredproductdata.img.map((img,ix) => (
                <Carousel.Item className="d-flex justify-content-center" key={ix}>
                  <img
                    className="d-block"
                    src={`http://localhost:4000/${img}`}
                    alt={"offeredproductdata images"}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
          <p className="fs-5 mt-3">Details</p>
          <div className="container text-capitalize">
            <div className="row mb-2 bg-light">
              <div className="col-6 border-start border-5 border-primary">
                {props.offeredproductdata.categoryId === "63734f55c969d1ab1fd73b6f" && "Country"} {props.offeredproductdata.categoryId !== "63734f55c969d1ab1fd73b6f" && "Brand"}
              </div>
              <div className="col">{props.offeredproductdata.brand}</div>
            </div>
            <div className="row mb-2 bg-light">
              <div className="col-6 border-start border-5 border-primary">
                Color:
              </div>
              <div className="col">{props.offeredproductdata.color}</div>
            </div>
            <div className="row mb-2 bg-light">
              <div className="col-6 border-start border-5 border-primary">
                Duration of use:
              </div>
              <div className="col">{props.offeredproductdata.durationOfUse}</div>
            </div>
            <div className="row mb-2 bg-light">
              <div className="col-6 border-start border-5 border-primary">
                {props.offeredproductdata.categoryId === "63734f55c969d1ab1fd73b6f" && "Type"} {props.offeredproductdata.categoryId === "63734f55c969d1ab1fd73b74" && "Type"} {props.offeredproductdata.categoryId === "63734f55c969d1ab1fd73b72" && "OS"} {props.offeredproductdata.categoryId === "6363b2908a17142dd3e7e8a7" && "Storage Area"} {props.offeredproductdata.categoryId === "6363b2908a17142dd3e7e8a8" && "Hard Storage Area"} {props.offeredproductdata.categoryId === "6363b2908a17142dd3e7e8aa" && "Storage Area"}
              </div>
              <div className="col">{props.offeredproductdata.firstFilter}</div>
            </div>

            <div className="row mb-2 bg-light">
              <div className="col-6 border-start border-5 border-primary ">
                {props.offeredproductdata.categoryId === "63734f55c969d1ab1fd73b6f" && "Lengths"} {props.offeredproductdata.categoryId === "63734f55c969d1ab1fd73b74" && "Material"} {props.offeredproductdata.categoryId === "63734f55c969d1ab1fd73b72" && "Type of Storage"} {props.offeredproductdata.categoryId === "6363b2908a17142dd3e7e8a7" && "RAM Size"} {props.offeredproductdata.categoryId === "6363b2908a17142dd3e7e8a8" && "RAM Size"} {props.offeredproductdata.categoryId === "6363b2908a17142dd3e7e8aa" && "Resolution"}
              </div>
              <div className="col">{props.offeredproductdata.secondFilter}</div>
            </div>

            <div className="row mb-2 bg-light">
              <div className="col-6 border-start border-5 border-primary">
                {props.offeredproductdata.categoryId === "63734f55c969d1ab1fd73b6f" && "Widths"} {props.offeredproductdata.categoryId === "63734f55c969d1ab1fd73b74" && "Size"} {props.offeredproductdata.categoryId === "63734f55c969d1ab1fd73b72" && "Accessories"} {props.offeredproductdata.categoryId === "6363b2908a17142dd3e7e8a7" && "SIM Card"} {props.offeredproductdata.categoryId === "6363b2908a17142dd3e7e8a8" && "Processor"} {props.offeredproductdata.categoryId === "6363b2908a17142dd3e7e8aa" && "Camera lens"}
              </div>
              <div className="col">{props.offeredproductdata.thirdFilter}</div>
            </div>
          </div>
          <p className="fs-5 mt-3">Description</p>
          <p className="fs-6 fw-normal border border-2 rounded-2 p-2">
            {props.offeredproductdata.description}
          </p>
        </article>
      </div>
    </div>
  );
}

export default ProductCard;
