import React from 'react';
import './Footer.css'
import logo from '../../images/logo2.png'
function Footer() {
    return (
        <footer className='d-flex align-items-end'>
            <div className='container mt-5 '>
                <div>
                    <div className="row text-light">
                        <div className="col-3">
                            <div >
                                <img src={logo} alt="l" width="200px" />
                            </div>
                            <p className="mt-4 w-75">
                                Join our website now and start selling, buying or exchanging stuff.
                            </p>
                        </div>
                        <div className="col pt-5">
                            <h2>Category</h2>
                            <div className="flex-column d-flex mt-4">
                                <a className="text-light text-decoration-none">Antiques</a>
                                <a className="text-light text-decoration-none">PC &amp; Laptop</a>
                                <a className="text-light text-decoration-none">Mobile &amp; Tablet</a>
                                <a className="text-light text-decoration-none">Console games</a>
                                <a className="text-light text-decoration-none">Cameras</a>
                                <a className="text-light text-decoration-none">Home Appliances</a>
                            </div>
                        </div>
                        <div className="col pt-5">
                            <h2>Company</h2>
                            <div className="flex-column d-flex mt-4">
                                <a className="text-light text-decoration-none">About Us</a>
                                <a className="text-light text-decoration-none">Why Choose Us</a>
                                <a className="text-light text-decoration-none">Contact Us</a>
                            </div>
                        </div>
                        <div className="col pt-5">
                            <div className="border border-1 round bg-light bg-opacity-25 p-4">
                                <h5 className="mb-2">News letter</h5>
                                <form className="d-flex justify-content-around align-items-center mb-3">
                                    <i className="fa-regular fa-envelope" />
                                    <input type="email" placeholder="Enter your email" className="out border-bottom" />
                                    <button type="submit" className="out text-light"><i className="fa-solid fa-arrow-right" /></button>
                                </form>
                                <div className="d-flex justify-content-between">
                                    <a className="text-light fs-3 ps-2"><i className="fa-brands fa-facebook" /></a>
                                    <a className="text-light fs-3 ps-2"><i className="fa-brands fa-twitter" /></a>
                                    <a className="text-light fs-3 ps-2"><i className="fa-brands fa-instagram" /></a>
                                    <a className="text-light fs-3 ps-2"><i className="fa-brands fa-youtube" /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="m-0 text-center py-2 mt-1">
                    <p className="m-0 text-light fw-bold">
                        © KasrZearo.All rigths reserved <br />
                    </p>
                </div>
            </div>
        </footer>

    );
}

export default Footer;