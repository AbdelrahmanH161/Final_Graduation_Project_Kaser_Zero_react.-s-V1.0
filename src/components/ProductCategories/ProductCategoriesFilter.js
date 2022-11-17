import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router';

function ProductCategoriesFilter(props) {

    var x = useLocation().state

    function brand(e) {
        if (e.target.checked)
            props.brand(e.target.value);
        else
            props.brand("");
    }

    function duration(e) {
        if (e.target.checked)
            props.duration(e.target.value);
        else
            props.duration("");
    }

    function firstFilterKey(e) {
        if (e.target.checked)
            props.firstFilterKey(e.target.value);
        else
            props.firstFilterKey("");
    }

    function secondFilterKey(e) {
        if (e.target.checked)
            props.secondFilterKey(e.target.value);
        else
            props.secondFilterKey("");
    }

    function thirdFilterKey(e) {
        if (e.target.checked)
            props.thirdFilterKey(e.target.value);
        else
            props.thirdFilterKey("");
    }

    function colorfliterKey(e) {
        if (e.target.checked)
            props.colorfliterKey(e.target.value);
        else
            props.colorfliterKey("");
    }

    function sort(e) {
        if (e.target.checked)
            props.pricefilterKey(e.target.value);
        else
            props.pricefilterKey("");
    }

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

    return (
        <>
            <button className="btn btn-outline-primary w-25 m-3 border border-1 d-lg-none" data-bs-toggle="offcanvas" data-bs-target="#ee"><i className="fa-solid fa-filter" /> Filter </button>
            <div className="col-lg-2 offcanvas-lg offcanvas-start " id="ee">
                <div className="flex-shrink-0 bg-white">
                    <div className="d-flex justify-content-between align-items-center w-100 border-bottom pb-2">
                        <h3 className="fs-5 fw-semibold text-primary"><i className="fa-solid fa-filter" /> Filter</h3>
                        <button className="btn btn-outline-primary  d-lg-none " data-bs-toggle="offcanvas" data-bs-target="#ee"><i className="fa-solid fa-xmark" /></button>
                    </div>
                    <ul className="list-unstyled ps-0">
                        <li className="mb-1">
                            <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed w-100 text-primary" data-bs-toggle="collapse" data-bs-target="#Brand" aria-expanded="true">{x.title === "Antiques" && "Country"} {x.title !== "Antiques" && "Brand"}</button>
                            <div className="collapse show" id="Brand">
                                <form>
                                    <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small ps-4">
                                        {
                                            x.brands.map((br, idx) => {
                                                return <li key={idx}><input className="form-input" type="radio" name="brand" value={br} onChange={brand} /> {br} </li>
                                            }).slice(0, 15)
                                        }
                                    </ul>
                                </form>
                            </div>
                        </li>
                        <li className="mb-1">
                            <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed w-100 text-primary" data-bs-toggle="collapse" data-bs-target="#DURATION-OF-USE" aria-expanded="true">Duration Of Use</button>
                            <div className="collapse" id="DURATION-OF-USE">
                                <form>
                                    <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small ps-4">
                                        {durationsOfUse.map((element, index) => (
                                            <li key={index}><input className="form-input" type="radio" name="brand" value={element} onChange={duration} /> {element}</li>
                                        ))}
                                    </ul>
                                </form>
                            </div>
                        </li>
                        <li className="mb-1">
                            <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed w-100 text-primary" data-bs-toggle="collapse" data-bs-target="#MEMORY-SIZE" aria-expanded="true">{x.title === "Antiques" && "Type"} {x.title === "Home Appliances" && "Type"} {x.title === "Console Games" && "OS"} {x.title === "Mobile & Tablet" && "Storage Area"} {x.title === "PC & Laptop" && "Hard Storage Area"} {x.title === "Camera" && "Storage Area"}</button>
                            <div className="collapse" id="MEMORY-SIZE">
                                <form>
                                    <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small ps-4">
                                        {
                                            x.firstFilter.options.map((br, idx) => {
                                                return <li key={idx}><input className="form-input" type="radio" name="brand" value={br} onChange={firstFilterKey} /> {br} </li>
                                            })
                                        }
                                    </ul>
                                </form>
                            </div>
                        </li>
                        <li className="mb-1">
                            <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed w-100 text-primary" data-bs-toggle="collapse" data-bs-target="#RAM-SIZE" aria-expanded="true"> {x.title === "Antiques" && "Lengths"} {x.title === "Home Appliances" && "Material"} {x.title === "Console Games" && "Type of Storage"} {x.title === "Mobile & Tablet" && "RAM Size"} {x.title === "PC & Laptop" && "RAM Size"} {x.title === "Camera" && "Resolution"} </button>
                            <div className="collapse" id="RAM-SIZE">
                                <form>
                                    <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small ps-4">
                                        {
                                            x.secondFilter.options.map((br, idx) => {
                                                return <li key={idx}><input className="form-input" type="radio" name="brand" value={br} onChange={secondFilterKey} /> {br} </li>
                                            })
                                        }
                                    </ul>
                                </form>
                            </div>
                        </li>
                        <li className="mb-1">
                            <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed w-100 text-primary" data-bs-toggle="collapse" data-bs-target="#Color" aria-expanded="true">Color</button>
                            <div className="collapse show" id="Color">
                                <form>
                                    <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small d-flex gap-2 flex-wrap ps-4">
                                        {colors.map((color, index) => (
                                            <li key={index}>
                                                <input
                                                    className="form-check-input rounded-2 border border-1"
                                                    type="checkbox"
                                                    value={color}
                                                    style={{
                                                        width: "30px",
                                                        height: "20px",
                                                        backgroundColor: color,
                                                        cursor: "pointer",
                                                    }}
                                                    onChange={colorfliterKey}
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                </form>
                            </div>
                        </li>
                        <li className="mb-1">
                            <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed w-100 text-primary" data-bs-toggle="collapse" data-bs-target="#SIM-CARD" aria-expanded="true">{x.title === "Antiques" && "Widths"} {x.title === "Home Appliances" && "Size"} {x.title === "Console Games" && "Accessories"} {x.title === "Mobile & Tablet" && "SIM Card"} {x.title === "PC & Laptop" && "Processor"} {x.title === "Camera" && "Camera lens"}</button>
                            <div className="collapse" id="SIM-CARD">
                                <form>
                                    <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small ps-4">
                                        {
                                            x.thirdFilter.options.map((br, idx) => {
                                                return <li key={idx}><input className="form-input" type="radio" name="brand" value={br} onChange={thirdFilterKey} /> {br} </li>
                                            })
                                        }
                                    </ul>
                                </form>
                            </div>
                        </li>
                        <li className="mb-1">
                            <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed w-100 text-primary" data-bs-toggle="collapse" data-bs-target="#PRICE" aria-expanded="true">Sort By Price</button>
                            <div className="collapse" id="PRICE">
                                <form>
                                    <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small ps-4">
                                        <li><input className="form-input" type="radio" name="brand" value="Ascending" onChange={sort} /> From lowest to Highest</li>
                                        <li><input className="form-input" type="radio" name="brand" value="Descending" onChange={sort} /> From Highest to lowest</li>
                                    </ul>
                                </form>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default ProductCategoriesFilter;