import React, { useState,useEffect } from "react";
// import "./PostAd.css";
import FormData from "form-data";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../config/axios";
// import { InfinitySpin } from "react-loader-spinner";
import { Container, ProgressBar } from "react-bootstrap";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import swal from "sweetalert";

function PostAd(props) {
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])
  const nav = useNavigate();
  const userId = JSON.parse(localStorage.getItem("authorization"))
  
  const colors = [
    "red",
    "pink",
    "purple",
    "blue",
    // "teal",
    "green",
    // "lime",
    "yellow",
    "orange",
    "brown",
    "gray",
    "black",
    "white",
    // "indigo",
  ];

  const durationsOfUse = [
    "Up to 3 months",
    "3 to 6 months",
    "1 year",
    "2 years",
    "3 years",
    "4 years",
    "5 years and more",
  ];

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      categoryId: "",
      title: "",
      price: null,
      ableToExchange: false,
      brand: "",
      durationOfUse: "",
      firstFilter: "",
      secondFilter: "",
      thirdFilter: "",
      img: [],
      description: "",
      color: "",
    },
  });
  const [succes, setSucces] = useState("")
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState({
    title: "",
    _id: "",
    brands: [],
    firstFilter: {
      title: "",
      options: [],
    },
    secondFilter: {
      title: "",
      options: [],
    },
    thirdFilter: {
      title: "",
      options: [],
    },
  });

  useEffect(() => {
    getCategories();
  }, []);

  async function getCategories() {
    await axios.get('http://localhost:4000/product/categories')
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => console.log(err));
  }

  const onSubmit = (values) => {
    var form = new FormData();
    form.append("title", values.title);
    form.append("price", values.price);
    form.append("description", values.description);
    form.append("brand", values.brand);
    form.append("durationOfUse", values.durationOfUse);
    form.append("ableToExchange", values.ableToExchange);
    form.append("firstFilter", values.firstFilter);
    form.append("secondFilter", values.secondFilter);
    form.append("thirdFilter", values.thirdFilter);
    form.append("categoryId", selectedCat._id);
    form.append("color", values.color);
    form.append("location", values.location);
    for (let i = 0; i < values.img.length; i++) {
      form.append("img", values.img[i]);
    }
    values.categoryId = selectedCat._id;

    axios.post(`http://localhost:4000/product/add/${userId}`, form) // after login add user id in params
      .then((res) => {
        setSucces(res.data)
      });
  };

  function navv() {
    if (succes === "success") {
      swal('Product posted successfully!')
      nav(`/myAds/${userId}`)
    }
  }

  const [loading, setLoading] = useState(false);
  // setLoading("true");

  return !loading === true ? (
    <div
      id="body"
      className="container p-5 mt-5 border border-primary border-1 rounded-4 mb-4 w-75"
    >
      <h2 className="text-center my-4 ">
        POST YOUR AD
      </h2>
      <h5 className="mt-5 mb-3">SELECT A CATEGORY</h5>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div
          className="btn-group w-100 "
          role="group"
          aria-label="Basic radio toggle button group"
        >
          {categories.map((category, index) => (
            <>
              <input
                type="radio"
                className="btn-check"
                // {...register("title", { required: "This field is required" })}
                id={category.title}
                name="category"
                onChange={(val) => {
                  setSelectedCat(
                    categories.find(
                      (category) => category.title === val.target.value
                    )
                  );
                }}
                value={category.title}
              />
              <label
                className="btn btn-outline-primary"
                htmlFor={category.title}
              >
                {category.title}
              </label>
            </>
          ))}
        </div>
        {/* {selectedCat.title === "antiques" ? (
                <small className="text-danger">
                  Note: This category works on auction system
                </small>
              ) : (
                <></>
              )} */}
        <div className="my-5 mx-3">
          <div className="mb-4">
            <label className="form-label">
              AD TITLE
            </label>
            <input
              type="text"
              // name="title"
              {...register("title", {
                required: "You must mention title for your product",
                minLength: { value: 4, message: "Min length of chars is 4" },
              })}
              // value={values.title}
              className="form-control"
              // onChange={handleChange}
              // onBlur={handleBlur}
              style={{
                borderColor: errors.title ? "red" : "",
              }}
            />
            <small style={{ color: "red" }}>{errors.title?.message}</small>
            {/* {errors.title && touched.title ? (
                  <small style={{ color: "red" }}>{errors.title}</small>
                ) : (
                  <small id="helpId" className="text-muted">
                    Mention title for your ad
                  </small>
                )} */}
          </div>
          <div className="mb-4">
            <label className="form-label">
              PRICE
              {/* {selectedCat.title === "antiques" ? "START FROM" : "PRICE"} */}
            </label>
            <div className="input-group">
              <input
                type="number"
                {...register("price", {
                  required: "Set a price for your product",
                  min: { value: 1, message: "Invalid price" },
                })}
                // name="price"
                className="form-control"
                // placeholder
                // onChange={handleChange}
                // onBlur={handleBlur}
                style={{
                  borderColor: errors.price ? "red" : "",
                }}
              />
              <span className="input-group-text col-1 text-center">EGP</span>
            </div>
            <small style={{ color: "red" }}>{errors.price?.message}</small>

            {/* {errors.price && touched.price ? (
                  <small style={{ color: "red" }}>{errors.price}</small>
                ) : (
                  <small id="price" className="text-muted">
                    Set a price for your product
                    {selectedCat.title === "antiques"
                            ? "Set a price you like to start from"
                            : "Set a price for your product"}
                  </small>
                )} */}
          </div>
          <div className="form-check form-switch mb-4">
            <input
              className="form-check-input"
              // name="ableToExchange"
              {...register("ableToExchange")}
              type="checkbox"
            // id
            // onChange={handleChange}
            />
            <label
              className="form-check-label fw-bold"
              style={{ fontSize: "17px" }}
            >
              ABLE TO EXCHANGE
            </label>
          </div>
          {selectedCat.title === "" ? (
            <></>
          ) : (
            <>
              <div className="row mb-4">
                <div className="col">
                  <label htmlFor="brand_list" className="form-label">
                    BRAND
                  </label>
                  <select
                    className="form-select"
                    {...register("brand", {
                      required: "This field is required",
                    })}
                    id="brand_list"
                    // name="brand"
                    // aria-label=".form-select-lg example"
                    // onChange={handleChange}
                    // onBlur={handleBlur}
                    style={{
                      borderColor: errors.brand ? "red" : "",
                    }}
                  >
                    <option selected hidden>
                      Select product's brand
                    </option>
                    {selectedCat.brands.map((brand, index) => (
                      <option key={index} value={brand}>{brand}</option>
                    ))}
                  </select>
                  <small style={{ color: "red" }}>
                    {errors.brand?.message}
                  </small>

                  {/* {errors.brand && touched.brand ? (
                        <small style={{ color: "red" }}>{errors.brand}</small>
                      ) : (
                        ""
                      )} */}
                </div>
                <div className="col">
                  <label htmlFor="durationofuse_list" className="form-label">
                    DURATION OF USE
                  </label>
                  <select
                    className="form-select"
                    id="durationofuse_list"
                    {...register("durationOfUse", {
                      required: "This field is required",
                    })}
                    // name="durationOfUse"
                    // onChange={handleChange}
                    // onBlur={handleBlur}
                    style={{
                      borderColor: errors.durationOfUse ? "red" : "",
                    }}
                  >
                    <option selected hidden>
                      Select the duration of use
                    </option>
                    {durationsOfUse.map((element, index) => (
                      <option key={index} value={element}>{element}</option>
                    ))}
                  </select>
                  <small style={{ color: "red" }}>
                    {errors.durationOfUse?.message}
                  </small>

                  {/* {errors.durationOfUse && touched.durationOfUse ? (
                        <small style={{ color: "red" }}>
                          {errors.durationOfUse}
                        </small>
                      ) : (
                        ""
                      )} */}
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-8">
                  <div className="mb-4">
                    <label
                      htmlFor={selectedCat.firstFilter.title}
                      className="form-label"
                    >
                      {selectedCat.firstFilter.title.toUpperCase()}
                    </label>
                    <select
                      className="form-select"
                      id={selectedCat.firstFilter.title}
                      {...register("firstFilter", {
                        required: "This field is required",
                      })}
                      // onChange={handleChange}
                      // name="firstFilter"
                      // onBlur={handleBlur}
                      style={{
                        borderColor: errors.firstFilter ? "red" : "",
                      }}
                    >
                      <option selected hidden>
                        Select the {selectedCat.firstFilter.title}
                      </option>
                      {selectedCat.firstFilter.options.map((val, index) => (
                        <option key={index} value={val}>{val}</option>
                      ))}
                    </select>
                    <small style={{ color: "red" }}>
                      {errors.firstFilter?.message}
                    </small>

                    {/* {errors.firstFilter && touched.firstFilter ? (
                          <small style={{ color: "red" }}>
                            {errors.firstFilter}
                          </small>
                        ) : (
                          ""
                        )} */}
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor={selectedCat.secondFilter.title}
                      className="form-label"
                    >
                      {selectedCat.secondFilter.title.toUpperCase()}
                    </label>
                    <select
                      className="form-select"
                      {...register("secondFilter", {
                        required: "This field is required",
                      })}
                      // id={selectedCat.secondFilter.title}
                      // onChange={handleChange}
                      // name="secondFilter"
                      // onBlur={handleBlur}
                      style={{
                        borderColor: errors.secondFilter ? "red" : "",
                      }}
                    >
                      <option selected hidden>
                        Select the {selectedCat.secondFilter.title}
                      </option>
                      {selectedCat.secondFilter.options.map((val, index) => (
                        <option key={index} value={val}>{val}</option>
                      ))}
                    </select>
                    <small style={{ color: "red" }}>
                      {errors.secondFilter?.message}
                    </small>

                    {/* {errors.secondFilter && touched.secondFilter ? (
                          <small style={{ color: "red" }}>
                            {errors.secondFilter}
                          </small>
                        ) : (
                          ""
                        )} */}
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor={selectedCat.thirdFilter.title}
                      className="form-label"
                    >
                      {selectedCat.thirdFilter.title.toUpperCase()}
                    </label>
                    <select
                      className="form-select"
                      id={selectedCat.thirdFilter.title}
                      {...register("thirdFilter", {
                        required: "This field is required",
                      })}
                      // onChange={handleChange}
                      // name="thirdFilter"
                      // onBlur={handleBlur}
                      style={{
                        borderColor: errors.thirdFilter ? "red" : "",
                      }}
                    >
                      <option selected hidden>
                        Select the {selectedCat.thirdFilter.title}
                      </option>
                      {selectedCat.thirdFilter.options.map((val, index) => (
                        <option key={index} value={val}>{val}</option>
                      ))}
                    </select>
                    <small style={{ color: "red" }}>
                      {errors.thirdFilter?.message}
                    </small>

                    {/* {errors.thirdFilter && touched.thirdFilter ? (
                          <small style={{ color: "red" }}>
                            {errors.thirdFilter}
                          </small>
                        ) : (
                          ""
                        )} */}
                  </div>
                </div>
                <div
                  className="col-4 mx-auto my-auto h-50 rounded-3 pt-3 pb-3"
                  style={{
                    width: "31%",
                    border: errors.color
                      ? "1px solid red"
                      : "2px solid lightgray",
                  }}
                >
                  {errors.color ? (
                    <label
                      style={{ color: "red" }}
                      htmlFor="color"
                      className="form-label"
                    >
                      COLOR
                    </label>
                  ) : (
                    <label htmlFor="color" className="form-label">
                      COLOR
                    </label>
                  )}
                  <div className="container w-100 h-100 pt-4">
                    <ul className="btn-toggle-nav list-unstyled d-flex gap-3 flex-wrap ps-4">
                      {colors.map((color, index) => (
                        <li key={index}>
                          <input
                            className="form-check-input rounded-2 border border-1"
                            type="radio"
                            // name="color"
                            value={color}
                            {...register("color", {
                              required: "This field is required",
                            })}
                            // onChange={handleChange}
                            // onBlur={handleBlur}
                            style={{
                              width: "30px",
                              height: "20px",
                              backgroundColor: color,
                              cursor: "pointer",
                            }}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {/* <small
                  className="d-flex me-5 justify-content-end"
                  style={{ color: "red" }}
                >
                  {errors.color?.message}
                </small> */}
              </div>
              <div className="form-group mb-4">
                <label htmlFor="productimages" className="form-label">
                  Choose product images
                </label>
                <input
                  className="form-control"
                  type="file"
                  {...register("img", { required: "This field is required" })}
                  multiple="multiple"
                  accept="image/*"
                />
                <small style={{ color: "red" }}>{errors.img?.message}</small>
              </div>
              <label className="form-label">
                Location
              </label>
              <input
                type="text"
                // name="title"
                {...register("location", {
                  required: "You must enter location for your product",
                  minLength: { value: 4, message: "Min length of chars is 4" },
                })}
                // value={values.title}
                className="form-control mb-4"
                // onChange={handleChange}
                // onBlur={handleBlur}
                style={{
                  borderColor: errors.location ? "red" : "",
                }}
              />
              <div className="mb-5">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  // onChange={handleChange}
                  // name="description"
                  rows={6}
                  {...register("description", {
                    required: "This field is required",
                  })}
                  // onBlur={handleBlur}
                  style={{
                    borderColor: errors.description ? "red" : "",
                  }}
                />
                <small style={{ color: "red" }}>
                  {errors.description?.message}
                </small>

                {/* {errors.description && touched.description ? (
                      <small style={{ color: "red" }}>{errors.description}</small>
                    ) : (
                      ""
                    )} */}
              </div>
            </>
          )}
          <div className="text-center">
            <button
              type="submit"
              disabled={selectedCat.title === "" ? true : false}
              className="btn btn-primary px-5 rounded-5 w-25 fs-5 text-white"
              onClick={navv}
              // data-bs-toggle="modal" data-bs-target="#ok"
            >
              Post Product
            </button>
          </div>
          {selectedCat.title === "" ? (
            <h4 className="text-center" style={{ color: "red" }}>
              Select a category to complete your ad
            </h4>
          ) : (
            <></>
          )}
          {/* {succes === "succes" && <div className="modal fade" id="ok" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body text-center">
                  Product posted successfully!
                </div>
                <div className="modal-footer justify-content-center">
                  <button type="button" className="btn btn-outline-primary rounded-5 px-4" data-bs-dismiss="modal" onClick={navv}>Ok</button>
                </div>
              </div>
            </div>
          </div>} */}
        </div>
      </form>
    </div>
  ) : (
    <div
      id="body"
      className="container-fluid"
      style={{
        width: 100,
        height: 100,
      }}
    >
      <ProgressBar
        height="80"
        width="80"
        ariaLabel="progress-bar-loading"
        wrapperStyle={{}}
        wrapperClass="progress-bar-wrapper"
        borderColor="#F4442E"
        barColor="#51E5FF"
      />
    </div>
  );
}

export default PostAd;
