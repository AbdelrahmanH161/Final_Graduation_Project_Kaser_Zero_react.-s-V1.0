import React, { useState, useEffect } from 'react';
import { store } from '../../Redux/Store';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { axiosInstance } from "../../config/axios";
import { useNavigate } from 'react-router-dom'

function CartPrice({ data }) {

    const user = JSON.parse(localStorage.getItem("authorization"))
    const [usr, setUsr] = useState({})
    const nav = useNavigate()

    useEffect(() => {
        axiosInstance.get(`/user/getUser/${user}`).then((res) => {
            setUsr(res.data)
        })
    }, [])

    const formikcart = useFormik({
        initialValues:
        {
            phoneNumber: '',
            // address:'',
            blockNumber: "",
            st: "",
            city: "",
            area: "",

        },

        validationSchema: yup.object().shape({
            phoneNumber: yup.string().min(11, " you Most enter of eleven numbers "),
            // address: yup.string()
        }),

        onSubmit: (values) => {
            // const form = new FormData()
            // form.append("phoneNumber",values.phoneNumber)
            // form.append("address",{
            //     "blockNumber":values.blockNumber,
            //     "st":values.st,
            //     "city":values.city,
            //     "area":values.area,
            // })
            
            if (values.phoneNumber === '') {
                values.phoneNumber = usr.phoneNumber
            }
            if (values.blockNumber === '') {
                values.blockNumber = usr.address.blockNumber
            }
            if (values.st === '') {
                values.st = usr.address.st
            }
            if (values.area === '') {
                values.area = usr.address.area
            }
            if (values.city === '') {
                values.city = usr.address.city
            }
            const val ={
                "phoneNumber":values.phoneNumber,
                "address":{
                    "blockNumber":values.blockNumber,
                    "st":values.st,
                    "city":values.city,
                    "area":values.area,
                }
            }
            axiosInstance.post(`/user/confirm/${user}`, val).then((res) => {
                nav(`/confirm/${user}`, { state: data })
            })
        },
    });

    const [datas, setDate] = useState(data);

    store.subscribe(() => {
        setDate([...store.getState().cart]);
    });

    return (
        <>
            <div className="col-3" style={{ marginTop: 104 }}>
                <div className=" w-100">
                    <aside className=" bg-white py-5  border rounded-3   text-center" style={{ height: 'fit-content' }}>
                        <div className="sum pb-3 px-5">
                            <h5>Total Price: </h5>
                            <p className="pt-1">{data} EGY</p>
                        </div>
                        {/* Button trigger modal */}
                        <button type="button" className="btn btn-outline-primary border border-1  w-75 rounded-5" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Proceed
                        </button>
                        <div className="modal fade bg-black bg-opacity-75" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header bg-primary">
                                        <h5 className="modal-title text-light" id="exampleModalLabel">Proceed</h5>
                                        <button className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                    </div>
                                    <div className="modal-body p-5 text-start">
                                        <form onSubmit={formikcart.handleSubmit}>
                                            <div className="mb-3 border-bottom border-primary border-opacity-50 pb-3 d-flex justify-content-between">
                                                <p className="form-label">User Name:</p>
                                                <p>{usr.userName}</p>
                                            </div>
                                            <div className="mb-3 border-bottom border-primary border-opacity-50 pb-3">
                                                <div className="d-flex justify-content-between pb-2">
                                                    <p className="form-label">Phone Number:</p>
                                                    <p className="form-label">{usr.phoneNumber}</p>
                                                </div>
                                                <div className="d-flex">
                                                    <input type="text" className="form-control" id="telp" name="phoneNumber" placeholder="Add another phone number" value={formikcart.values.phoneNumber} onChange={formikcart.handleChange} />
                                                    <button className="btn text-primary"><i className="fa-solid fa-plus" /></button>
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <p className="form-label">BlockNumber:</p>
                                                <p className="form-label" style={{ fontSize: '12px' }}>{usr.address?.blockNumber}</p>
                                                <div className="d-flex">
                                                    <input type="text" className="form-control" id="tela" name="blockNumber" placeholder="Add another blockNumber" value={formikcart.values.blockNumber} onChange={formikcart.handleChange} />
                                                    <button className="btn text-primary"><i className="fa-solid fa-plus" /></button>
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <p className="form-label">Street:</p>
                                                <p className="form-label" style={{ fontSize: '12px' }}>{usr.address?.st}</p>
                                                <div className="d-flex">
                                                    <input type="text" className="form-control" id="tela" name="st" placeholder="Add another street" value={formikcart.values.st} onChange={formikcart.handleChange} />
                                                    <button className="btn text-primary"><i className="fa-solid fa-plus" /></button>
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <p className="form-label">City:</p>
                                                <p className="form-label" style={{ fontSize: '12px' }}>{usr.address?.city}</p>
                                                <div className="d-flex">
                                                    <input type="text" className="form-control" id="tela" name="city" placeholder="Add another city" value={formikcart.values.city} onChange={formikcart.handleChange} />
                                                    <button className="btn text-primary"><i className="fa-solid fa-plus" /></button>
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <p className="form-label">Area:</p>
                                                <p className="form-label" style={{ fontSize: '12px' }}>{usr.address?.area}</p>
                                                <div className="d-flex">
                                                    <input type="text" className="form-control" id="tela" name="area" placeholder="Add another area" value={formikcart.values.area} onChange={formikcart.handleChange} />
                                                    <button className="btn text-primary"><i className="fa-solid fa-plus" /></button>
                                                </div>
                                            </div>
                                            <button data-bs-dismiss="modal" aria-label="Close" type="submit" className="btn btn-primary form-control mt-3">Proceed</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </>
    );
}

export default CartPrice;

{/* <div className="gap-2">
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
                </div> */}