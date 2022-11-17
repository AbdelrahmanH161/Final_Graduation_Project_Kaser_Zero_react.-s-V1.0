import React from 'react'
import { useLocation,useNavigate } from 'react-router'

function SearchedContent() {

    const x = useLocation().state;
    const nav = useNavigate();

    function productDetails(data) {
        nav("/product", { state: data })
    }

  return (
    <>
        <div className="col-lg-10 col-md-12 mt-2">
                <div className="row row-cols-lg-4 row-cols-md-3 row-cols-sm-2 g-3 px-lg-5 px-md-2 py-2">
                    {x.map((item,index)=>{
                        return <div className="col" key={index}>
                        <div className="card_Products border border-1">
                            <div className="img py-2" key={index}>
                                <img src={'http://localhost:4000/' + item.img[0]} alt="..." width="90%"/>
                            </div>
                            <div className="p-2">
                                <p className="m-0  text-primary fw-semibold fs-5"> {item.title}</p>
                                <p className="px-2 m-0">{item.durationOfUse}</p>
                                <p className="m-0  text-primary fw-semibold fs-5 px-1">EGY {item.price}</p>
                            </div>
                            <input type="button" defaultValue="View Details" className="btn btn-primary text-light w-100 rounded-0" onClick={() => productDetails(item)} />
                        </div>
                </div>
                    })}
                </div>
            </div>
    </>
  )
}

export default SearchedContent