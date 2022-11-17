import React, { useRef, useState } from "react";
import "./PostAd.css";
import { Field, Formik, useFormik } from "formik";
import { schema } from "./schema";
import Dropzone from "react-dropzone";
import Thumb from "./Thumb";
import { useEffect } from "react";
import { axiosInstance } from "../../config/axios";

function PostA(props) {
  const colors = [
    "red",
    "pink",
    "purple",
    "blue",
    "teal",
    "green",
    "lime",
    "yellow",
    "orange",
    "brown",
    "gray",
    "black",
    "white",
    "indigo",
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

  const initialValues = {
    categoryId: "",
    title: "",
    price: 0,
    ableToExchange: false,
    brand: "",
    durationOfUse: "",
    firstFilter: "",
    secondFilter: "",
    thirdFilter: "",
    img: [],
    description: "",
    color: "",
  };

  // const onSubmit = (values) => {
  //   console.log(values);
  //   // values.setFieldValue("imges", "");
  // };
  const validationSchema = schema;
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
    await axiosInstance
      .get("product/categories")
      .then((res) => {
        setCategories(res.data);
        // setSelectedCat(categories[0]);
      })
      .catch((err) => console.log(err));
  }
  console.log(selectedCat.title);

  function changeCategory(value) {
    // console.log(value);
    setSelectedCat(categories.find((category) => category.title === value));
    // console.log(index);
    // console.log(categories[index]);
    // setSelectedCat(categories[index]);
    // console.log(selectedCat);
  }

  return (
      <div
        id="body"
        className="container p-5 mt-5 border border-primary border-4 rounded-4 mb-4"
      >
        <h2 className="text-center my-4 border-bottom border-3 border-primary">
          POST YOUR AD
        </h2>
        <h5 className="mt-5 mb-3">SELECT A CATEGORY</h5>
            <form onSubmit={handleSubmit(onSubmit)}  enctype="multipart/form-data">
              <div
                className="btn-group w-100 "
                role="group"
                aria-label="Basic radio toggle button group"
              >
                {categories.map((category, index) => (
                  <>
                    <input
                      // key={index}
                      type="radio"
                      className="btn-check"
                      name="category"
                      id={category.title}
                      autoComplete="off"
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
                  <label htmlFor className="form-label">
                    AD TITLE
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={values.title}
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{
                      borderColor: errors.title && touched.title ? "red" : "",
                    }}
                  />
                  {errors.title && touched.title ? (
                    <small style={{ color: "red" }}>{errors.title}</small>
                  ) : (
                    <small id="helpId" className="text-muted">
                      Mention title for your ad
                    </small>
                  )}
                </div>
                <div className="mb-4">
                  <label className="form-label">
                    PRICE
                    {/* {selectedCat.title === "antiques" ? "START FROM" : "PRICE"} */}
                  </label>
                  <div className="input-group">
                    <input
                      type="number"
                      name="price"
                      min={0}
                      className="form-control"
                      placeholder
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{
                        borderColor: errors.price && touched.price ? "red" : "",
                      }}
                    />
                    <span
                      className="input-group-text col-1 text-center"
                      id="basic-addon2"
                    >
                      EGP
                    </span>
                  </div>
                  {errors.price && touched.price ? (
                    <small style={{ color: "red" }}>{errors.price}</small>
                  ) : (
                    <small id="price" className="text-muted">
                      Set a price for your product
                      {/* {selectedCat.title === "antiques"
                        ? "Set a price you like to start from"
                        : "Set a price for your product"} */}
                    </small>
                  )}
                </div>
                <div className="form-check form-switch mb-4">
                  <input
                    className="form-check-input"
                    name="ableToExchange"
                    type="checkbox"
                    id
                    onChange={handleChange}
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
                          id="brand_list"
                          name="brand"
                          aria-label=".form-select-lg example"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          style={{
                            borderColor:
                              errors.brand && touched.brand ? "red" : "",
                          }}
                        >
                          <option selected hidden>
                            Select product's brand
                          </option>
                          {selectedCat.brands.map((brand, index) => (
                            <option value={brand}>{brand}</option>
                          ))}
                        </select>
                        {errors.brand && touched.brand ? (
                          <small style={{ color: "red" }}>{errors.brand}</small>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="col">
                        <label
                          htmlFor="durationofuse_list"
                          className="form-label"
                        >
                          DURATION OF USE
                        </label>
                        <select
                          className="form-select"
                          id="durationofuse_list"
                          name="durationOfUse"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          style={{
                            borderColor:
                              errors.durationOfUse && touched.durationOfUse
                                ? "red"
                                : "",
                          }}
                        >
                          <option selected hidden>
                            Select the duration of use
                          </option>
                          {durationsOfUse.map((element) => (
                            <option value={element}>{element}</option>
                          ))}
                        </select>
                        {errors.durationOfUse && touched.durationOfUse ? (
                          <small style={{ color: "red" }}>
                            {errors.durationOfUse}
                          </small>
                        ) : (
                          ""
                        )}
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
                            onChange={handleChange}
                            name="firstFilter"
                            onBlur={handleBlur}
                            style={{
                              borderColor:
                                errors.firstFilter && touched.firstFilter
                                  ? "red"
                                  : "",
                            }}
                          >
                            <option selected hidden>
                              Select the {selectedCat.firstFilter.title}
                            </option>
                            {selectedCat.firstFilter.options.map(
                              (val, index) => (
                                <option value={val}>{val}</option>
                              )
                            )}
                          </select>
                          {errors.firstFilter && touched.firstFilter ? (
                            <small style={{ color: "red" }}>
                              {errors.firstFilter}
                            </small>
                          ) : (
                            ""
                          )}
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
                            id={selectedCat.secondFilter.title}
                            onChange={handleChange}
                            name="secondFilter"
                            onBlur={handleBlur}
                            style={{
                              borderColor:
                                errors.secondFilter && touched.secondFilter
                                  ? "red"
                                  : "",
                            }}
                          >
                            <option selected hidden>
                              Select the {selectedCat.secondFilter.title}
                            </option>
                            {selectedCat.secondFilter.options.map(
                              (val, index) => (
                                <option value={val}>{val}</option>
                              )
                            )}
                          </select>
                          {errors.secondFilter && touched.secondFilter ? (
                            <small style={{ color: "red" }}>
                              {errors.secondFilter}
                            </small>
                          ) : (
                            ""
                          )}
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
                            onChange={handleChange}
                            name="thirdFilter"
                            onBlur={handleBlur}
                            style={{
                              borderColor:
                                errors.thirdFilter && touched.thirdFilter
                                  ? "red"
                                  : "",
                            }}
                          >
                            <option selected hidden>
                              Select the {selectedCat.thirdFilter.title}
                            </option>
                            {selectedCat.thirdFilter.options.map(
                              (val, index) => (
                                <option value={val}>{val}</option>
                              )
                            )}
                          </select>
                          {errors.thirdFilter && touched.thirdFilter ? (
                            <small style={{ color: "red" }}>
                              {errors.thirdFilter}
                            </small>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div
                        className="col-4 mx-auto my-auto h-50 border border-2 rounded-3 pt-3 pb-5 border-secondary"
                        style={{ width: "31%" }}
                      >
                        <label htmlFor="color" className="form-label">
                          COLOR
                        </label>
                        <div className="container w-100 h-100 pt-4">
                          <ul className="btn-toggle-nav list-unstyled d-flex gap-5 flex-wrap ps-4">
                            {colors.map((color) => (
                              <li>
                                <input
                                  className="form-check-input rounded-2 border border-1"
                                  type="radio"
                                  name="color"
                                  value={color}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
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
                    </div>
                    <div className="form-group mb-4">
                      <div className="d-flex justify-content-between mb-2">
                        <label
                          htmlFor="productimages"
                          className="form-label text-uppercase"
                        >
                          Choose up to 10 images
                        </label>
                        <button
                          className="btn btn-primary"
                          onClick={() => setFieldValue("img", [])}
                        >
                          Clear all
                        </button>
                      </div>
                      <Dropzone
                         enctype="multipart/form-data"
                        accept="image/*"
                        style={{
                          border: "1px solid",
                          borderColor:
                            errors.img && touched.img ? "red" : "grey",
                          backgroundColor: "white",
                          borderRadius: "5px",
                          padding: "10px",
                          cursor: "pointer",
                        }}
                        onDrop={(acceptedimg) => {
                          // do nothing if no img
                          if (acceptedimg.length === 0) {
                            return;
                          }

                          // on drop we add to the existing img
                          if (
                            acceptedimg.length + values.img.length <=
                            10
                          ) {
                            setFieldValue(
                              "img",
                              values.img.concat(acceptedimg)
                            );
                          } else {
                            return "Photos should be 10 at most";
                          }
                        }}
                      >
                        {({
                          isDragActive,
                          isDragReject,
                          acceptedimg,
                          rejectedimg,
                        }) => {
                          if (isDragActive) {
                            return "This file is authorized";
                          }

                          if (isDragReject) {
                            return "This file is not authorized";
                          }

                          if (values.img.length === 0) {
                            return "Try dragging images here!";
                          }

                          return values.img.map((file, i) => (
                            <Thumb key={i} file={file} />
                          ));
                        }}
                      </Dropzone>
                      {errors.img && touched.img ? (
                        <small style={{ color: "red" }}>{errors.img}</small>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="mb-5">
                      <label htmlFor="description" className="form-label">
                        Description
                      </label>
                      <textarea
                        className="form-control"
                        id="description"
                        onChange={handleChange}
                        name="description"
                        rows={6}
                        onBlur={handleBlur}
                        style={{
                          borderColor:
                            errors.description && touched.description
                              ? "red"
                              : "",
                        }}
                      />
                      {errors.description && touched.description ? (
                        <small style={{ color: "red" }}>
                          {errors.description}
                        </small>
                      ) : (
                        ""
                      )}
                    </div>
                  </>
                )}
                <button
                  type="submit"
                  disabled={selectedCat.title === "" ? true : false}
                  className="btn btn-primary w-100 mb-2 fs-3"
                >
                  POST AD
                </button>
                {selectedCat.title === "" ? (
                  <h4 className="text-danger text-center">
                    Select a category to complete your ad
                  </h4>
                ) : (
                  <></>
                )}
              </div>
            </form>
      </div>
    
  );
}

export default PostA;