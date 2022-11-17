import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { axiosInstance } from "../config/axios";
import Side from '../components/Side';
import swal from "sweetalert";
// import "./MyInfo.css";

function MyInfo() {
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])
  const [isLoading, setIsLoading] = useState(true);
  const userId = JSON.parse(localStorage.getItem("authorization"))
  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      phoneNumber: "",
      gender: "",
      birthDate: "",
      // address: "",
      blockNumber: "",
      st: "",
      city: "",
      area: "",
    },
    onSubmit: (values) => {
      handleFormSubmit(values);
    },
    validationSchema: yup.object({
      userName: yup
        .string()
        .max(30, "Name can't be more than 30 characters")
        .required("Required"),
      email: yup.string().email("Invalid Email Address").required("Required"),
      phoneNumber: yup
        .string()
        .matches(/^01[0125][0-9]{8}$/, "Invalid phone Number")
        .required("Required"),
    //   address: yup
    //     .string()
    //     .max(100, "Can't exceed 100 characters")
    //     .required("Required"),
    // 
  }),
  });

  function handleFormSubmit(formikData) {
    setIsLoading(true);
    console.log(formikData)
    axiosInstance
      .patch(`/user/updateUser/${userId}`, formikData
        // {
        //   userName: formikData.userName,
        //   email: formikData.email,
        //   phoneNumberNumber: formikData.phoneNumber,
        // }
      )
      .then((res) => console.log(res.data))
      .finally(() => {
        setIsLoading(false);
      });
    swal("Profile Updated!")
  }

  useEffect(() => {
    axiosInstance
      .get(`/user/getUser/${userId}`)
      .then((res) => {
        const user = res.data;

        formik.setValues({
          email: user.email,
          userName: user.userName,
          phoneNumber: user.phoneNumber,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div className="row me-0  mt-3 ">
        <Side></Side>
        <div className="col-9 ">
          <div className="d-flex flex-column gap-2 ps-5 ms-5">
            <h2 className=" fs-1 text-primary">Your Profile Information</h2>
            <br />
            <form onSubmit={formik.handleSubmit}>
              <label className="fs-5">Full Name:</label>
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.userName}
                type="text"
                name="userName"
                placeholder="Full Name"
                className="input border-1 mb-3 border bg-light rounded p-2 w-100"
              />
              {formik.touched.userName && formik.errors.userName ? (
                <p>{formik.errors.userName}</p>
              ) : null}
              <label className="fs-5">E-mail Address:</label>
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                type="email"
                name="email"
                placeholder="your e-mail"
                className="input border-1 mb-3 border bg-light rounded p-2 col-12"
              />
              {formik.touched.email && formik.errors.email ? (
                <p>{formik.errors.email}</p>
              ) : null}
              <label className="fs-5">Phone Number:</label>
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phoneNumber}
                type="tel"
                name="phoneNumber"
                placeholder="01012345678"
                className="input mb-3 border-1 border bg-light rounded p-2 col-12"
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                <p>{formik.errors.phoneNumber}</p>
              ) : null}
              <div>
                <br />
                <label className="fs-5">Gender:</label>
                <input
                  onChange={formik.handleChange}
                  type="radio"
                  name="gender"
                  value="Male"
                  className="ms-4"
                />
                <label htmlFor="male">Male</label>
                <input
                  onChange={formik.handleChange}
                  type="radio"
                  name="gender"
                  value="Female"
                  className="ms-3 "
                />
                <label htmlFor="female">Female</label>
              </div>
              <br />
              <label className="fs-5">Birth Date:</label> <br></br>
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.birthDate}
                type="date"
                name="birthDate"
                className=" input mb-3 border-1 border bg-light rounded p-2 col-12"
              />

              {/* <label className="fs-5 pt-1">adress:</label>
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
                type="text"
                name="address"
                placeholder="Your address"
                className="input mb-3 border-1 border bg-light rounded p-2 col-12"

              />
              {formik.touched.address && formik.errors.address ? (
                <p>{formik.errors.address}</p>
              ) : null} */}

              <div className="d-flex justify-content-between my-3">

                <div className="gap-2">
                  <label className="fs-5 pt-1">BlockNumber:</label>
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.blockNumber}
                    type="text"
                    name="blockNumber"
                    placeholder="Your BlockNumber"
                    className="input mb-3 border-1 border bg-light rounded p-2 col-12"

                  />
                  {formik.touched.blockNumber && formik.errors.blockNumber ? (
                    <p>{formik.errors.blockNumber}</p>
                  ) : null}
                </div>

                <div className="gap-2">
                  <label className="fs-5 pt-1">Street:</label>
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.st}
                    type="text"
                    name="st"
                    placeholder="Your Street"
                    className="input mb-3 border-1 border bg-light rounded p-2 col-12"

                  />
                  {formik.touched.st && formik.errors.st ? (
                    <p>{formik.errors.st}</p>
                  ) : null}
                </div>

                <div className="gap-2">
                  <label className="fs-5 pt-1">City:</label>
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.city}
                    type="text"
                    name="city"
                    placeholder="Your City"
                    className="input mb-3 border-1 border bg-light rounded p-2 col-12"

                  />
                  {formik.touched.city && formik.errors.city ? (
                    <p>{formik.errors.city}</p>
                  ) : null}
                </div>

                <div className="gap-2">
                  <label className="fs-5 pt-1">Area:</label>
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.area}
                    type="text"
                    name="area"
                    placeholder="Your Area"
                    className="input mb-3 border-1 border bg-light rounded p-2 col-12"

                  />
                  {formik.touched.area && formik.errors.area ? (
                    <p>{formik.errors.area}</p>
                  ) : null}
                </div>
              </div>

              <div id="save_reset">
                <div className="container d-flex flex-row gap-3 justify-content-end mt-3 mb-5">
                  <button
                    type="submit"
                    className="btn btn-outline-primary rounded-5 w-25"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyInfo;
