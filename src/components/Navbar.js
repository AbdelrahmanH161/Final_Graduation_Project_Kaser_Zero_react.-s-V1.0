import logo from "../images/Untitled-3.png";
import "./Navbar.css";
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useFormik } from 'formik';
import { validationSchema } from './validationSchema';
import axios from 'axios'
import * as yup from 'yup';
import swal from "sweetalert";
// import {axiosInstance} from '../config/axios';

function Navbar(props) {
  const userId = JSON.parse(localStorage.getItem("authorization"))
  const nav = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [userlogged,setUserlogged] = useState("")

  const formik1 = useFormik({
    initialValues: {
      userName: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmpassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      axios.post('http://localhost:4000/user/register', values).then((res) => {
      });
      nav('/', { replace: true });
    }
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      email: yup.string().email('Invalid email address').required('Enter email'),
      password: yup.string().min(6, 'Must be 6 chars or more!').required('Enter password')
    }),
    onSubmit: (values) => {
      axios.post('http://localhost:4000/user/login', values).then((res) => {
        if (res.data !== "not found this user") {
          localStorage.setItem("authorization", JSON.stringify(res.data._id))
          setUserlogged(res.data.userName)
        }
        nav('/', { replace: true });
      })
    }
  });
  const [searchInput, setSearchInput] = useState([]);
  const [prds, setPrds] = useState([]);
  const [result, setResult] = useState([])
  const [cat, setcat] = useState([])

  useEffect(function () {
    getprods()
  }, []);

  async function getprods() {
    await axios.get('http://localhost:4000/product/products').then((res) => {
      setPrds(res.data)
    }).catch((err) => console.log("err!!!!!!!!!Products"));

    await axios.get('http://localhost:4000/product/categories').then((res) => {
      setcat(res.data)
    }).catch((err) => console.log("err!!!!!!!!!Categories"));
  }

  const handleChange = (e) => {
    const searchWord = e.target.value;
    const dataFiltered = prds.filter((val) => {
      return val.title.toLowerCase().includes(searchWord)
    });
    if (searchWord === "")
      setSearchInput([]);
    else
      setSearchInput(dataFiltered);
  };

  function gotocat(p) {
    nav(`/category/${p._id}`, { state: p })
  }

  function gotoprofile() {
    nav(`/myInfo/${userId}`)
  }

  function logout() {
    localStorage.clear();
    swal("Thank you for visiting our website!")
    nav('/')
  }

  function gotopostadd() {
    nav(`/postAd/${userId}`)
  }

  function searchedProd(prd) {
    const x = prds.filter((item) => item.title === prd)
    if (x) {
      setResult(x)
      nav(`/searchedItems`, { state: x })
    }
    else console.log("not")
    setSearchInput([]);
  }

  return (
    <>
      <nav className="sticky-top">
        <div className="navbar pt-0 pb-1">
          <div className="d-flex align-items-center justify-content-between py-1 mb-2 w-100" style={{marginRight:"300px",marginLeft:"40px"}}>
            <Link to={'/home'} className="navbar-brand p-0 ps-3"><img src={logo} alt="l" width="200px" /></Link>
            <form className="d-flex w-50 position-relative  d-none d-md-block" role="search">
              <input className="form-control me-2 border-primary rounded-pill" type="search" placeholder="Search" aria-label="Search" onChange={handleChange} />
              <button className="btn text-primary position-absolute last" type="submit"> <i className="fa-solid fa-magnifying-glass" /> </button>
              {searchInput.length != 0 && (<div className='dataResult shadow'>
                {searchInput.slice(0, 8).map((itm, idx) => {
                  return <div key={idx}>
                    <p className='dataItem' onClick={() => searchedProd(itm.title)}>{itm.title}</p>
                  </div>
                })}
              </div>
              )}
            </form>
            {userId &&
              <div >
                <a className="btn btn-outline-primary rounded-pill px-3 mx-lg-1 mx-2 d-md-inline-block" onClick={() => gotoprofile()}><i className="fa-regular fa-user" />  {userlogged}</a>
                <a className="btn btn-outline-primary rounded-pill px-3 mx-lg-1 mx-2 d-md-inline-block" onClick={() => logout()}
                //  data-bs-toggle="modal" data-bs-target="#logout"
                 >Log out <i className="fa-solid fa-arrow-right-from-bracket"></i> </a>
                <a className="btn btn-outline-primary rounded-pill px-3 mx-lg-1 mx-2 d-md-inline-block" onClick={() => gotopostadd()}>Sell product</a>
              </div>
            }
            {!userId &&
              <div >
                <button className="btn btn-outline-primary rounded-pill px-3 mx-lg-3 d-none d-md-inline-block " data-bs-toggle="modal" data-bs-target="#sign_in">Sign in</button>
                <button className="btn btn-outline-primary rounded-pill px-3 mx-lg-3 d-none d-md-inline-block" data-bs-toggle="modal" data-bs-target="#sign_up"> Sign up</button>
              </div>
            }
          </div>
          <div >
            <button className="btn btn-outline-primary border border-1  d-sm-none " data-bs-toggle="modal" data-bs-target="#sign_in"><i className="fa-solid fa-right-to-bracket" /></button>
            <button className="btn btn-outline-primary border border-1  d-sm-none"><i className="fa-solid fa-user-plus" data-bs-toggle="modal" data-bs-target="#sign_up" /></button>
            <button className="btn btn-outline-primary d-sm-none border border-1" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <i className="fa-solid fa-bars" />
            </button>
          </div>
          <div className="background w-100" >
            <div className="container">
              <div className="navbar-expand-md w-100 d-md-block bg" id="navbarNav">
                <ul className="navbar-nav justify-content-evenly">
                  {cat.map((item, index) => {
                    return <li className="nav-item" key={index} onClick={() => gotocat(item)}>
                      <div className="nav-link text-primary" style={{ cursor: 'pointer', paddingTop: 10, paddingBottom: 10 }}>{item.title}</div>
                    </li>
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div>
        <div className="modal fade bg-black bg-opacity-75" id="sign_up" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-primary">
                <h5 className="modal-title text-light">Sign Up</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
              </div>
              <div className="modal-body p-5">
                <form onSubmit={formik1.handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="user_name" className="form-label">User Name</label>
                    <input type="text" className="form-control" onChange={formik1.handleChange} onBlur={formik1.handleBlur} value={formik1.values.userName} placeholder="Enter user name" name="userName" />
                    {formik1.touched.userName && <div className='bg-danger text-danger ps-2 mt-2 rounded-2 bg-opacity-10'  >{formik1.errors.userName}</div>}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" onChange={formik1.handleChange} onBlur={formik1.handleBlur} value={formik1.values.email} placeholder="E-mail" name="email" />
                    {formik1.touched.email && <div className='bg-danger text-danger ps-2 mt-2 rounded-2 bg-opacity-10'  >{formik1.errors.email}</div>}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tel" className="form-label">Phone Number</label>
                    <input type="tel" className="form-control" placeholder="phoneNumber" onChange={formik1.handleChange} onBlur={formik1.handleBlur} value={formik1.values.phoneNumber} name="phoneNumber" />
                    {formik1.touched.phoneNumber && <div className='bg-danger text-danger ps-2 mt-2 rounded-2 bg-opacity-10'  >{formik1.errors.phoneNumber}</div>}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="Password_1" className="form-label">Password</label>
                    <input type="password" className="form-control" placeholder="Password" onChange={formik1.handleChange} onBlur={formik1.handleBlur} value={formik1.values.password} name="password" />
                    <div className='bg-danger text-danger ps-2 mt-2 rounded-2 bg-opacity-10'  >{formik1.errors.password}</div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="Password_2" className="form-label">Confirm password</label>
                    <input type="password" className="form-control" placeholder="confirm password" onChange={formik1.handleChange} onBlur={formik1.handleBlur} value={formik1.values.confirmpassword} name="confirmpassword" />
                    <div className='bg-danger text-danger ps-2 mt-2 rounded-2 bg-opacity-10'  >{formik1.errors.confirmpassword}</div>
                  </div>
                  <button data-bs-dismiss="modal" aria-label="Close" type="submit" className="btn btn-primary form-control" disabled={!formik1.isValid && formik1.touched} >Sign Up</button>
                  <div className="form-text">Already has an account? <a className="text-primary" data-bs-toggle="modal" data-bs-target="#sign_in" style={{ cursor: 'pointer' }}>Sign In</a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade bg-black bg-opacity-75" id="sign_in" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-primary">
                <h5 className="modal-title text-light">Sign In</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
              </div>
              <div className="modal-body p-5">
                <form onSubmit={formik.handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="user_name" className="form-label">Email address</label>
                    <input type="text" className="form-control" name="email" id="user_name" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} aria-describedby="emailHelp" placeholder="Enter user name or email" />
                    <div className="bg-danger bg-opacity-10 ps-2 mt-2" style={{ color: 'red' }}>{formik.errors.email}</div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="Password_sign_in" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} id="Password_sign_in" placeholder="Password" />
                    <div className="bg-danger bg-opacity-10 ps-2 mt-2" style={{ color: 'red' }}>{formik.errors.password}</div>
                  </div>
                  <button data-bs-dismiss="modal" aria-label="Close" type="submit" className="btn btn-primary form-control">Sign In</button>
                  <div id="emailHelp" className="form-text">Don't have an account? <a className="text-primary" data-bs-toggle="modal" data-bs-target="#sign_up" style={{ cursor: 'pointer' }}>Sign
                    Up</a></div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="modal fade" id="logout" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body text-center">
                Thank you for visiting our website!
              </div>
              <div className="modal-footer justify-content-center">
                <button type="button" className="btn btn-outline-primary rounded-5 px-4" data-bs-dismiss="modal">Ok</button>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}

export default Navbar;
// make the secondary nav box shadow:
// style={{boxShadow: '1px 1px 6px #666768'}}