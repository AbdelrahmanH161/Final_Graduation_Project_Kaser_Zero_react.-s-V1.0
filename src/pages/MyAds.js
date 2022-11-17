import React, { useState, useEffect } from "react";
import { axiosInstance } from "../config/axios";
import { useNavigate } from 'react-router-dom'
import Side from '../components/Side'
// import "./MyAds.css";

function MyAds() {
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])
  const [items, setItems] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  const userId = JSON.parse(localStorage.getItem("authorization"))
  const nav = useNavigate()

  useEffect(() => {
    axiosInstance.get(`/user/ads/${userId}`).then((res) => {
      console.log(res.data)
      setItems(res.data.reverse());
      // setIsLoading(false);
      // console.log(items)
    });
  }, []);

  function removeFromAds(item) {
    // setIsLoading(true);
    axiosInstance
      .delete(`user/ads/${userId}/${item._id}`, {
        data: { Value: item._id },
      })
      .then(() =>
        setItems((perviousItems) =>
          perviousItems.filter((title) => item !== title)
        )
      )
    // .finally(() => setIsLoading(false));
  }

  function view(item) {
    nav(`/seeoffers`, { state: item })
  }

  return (
    <>
      <div className="me-0 row  mt-3">
        <Side></Side>
        <div className="col-9 ">
          {/* {isLoading && <p>Loading...</p>} */}
          {/* <!-- items --> */}
          <div className="d-flex flex-column gap-2 ps-5 ms-5 w-100">
            <h2 className="pb-5 fs-1 text-primary">Your Posted Products</h2>
            {items.length !== 0 ?
              <>
                {items.map((item, index) => {
                  return (
                    <div className="item border rounded-3 p-4 shadow-sm" key={index}>
                      <div className="row justify-content-between mb-4">
                        <div className="info col-8">
                          <h2 className="mb-3">{item.title}</h2>
                          <p>{item.description}</p>
                          <p>Used For: {item.durationOfUse}</p>
                          <p>Color: {item.color}</p>
                          <h4>{item.price} EGP</h4>
                          {item.status === "pending" && <div className="text-primary fw-bold fs-5">Status: {item.status}..</div>}
                          {item.status === "active" && <div className="text-success fw-bold fs-5">Status: {item.status}</div>}
                          {item.status === "canceled" && <div className="text-danger fw-bold fs-5">Status: {item.status}</div>}
                          {item.status === "sold" && <div className="text-dark fw-bold fs-5">Status: {item.status}</div>}
                          {item.status === "ordered" && <div className="text-dark fw-bold fs-5">Status: {item.status}</div>}
                        </div>
                        <div className="col-4 text-center">
                          <img src={'http://localhost:4000/' + item.img[0]} alt={1} style={{ width: '10rem' }} />
                        </div>
                      </div>
                      {item.status !== "sold" && 
                      <div className="actions d-flex justify-content-end gap-3">
                        {item.ableToExchange === "true" && <button className="btn btn-outline-primary rounded-5 px-4" onClick={() => view(item)}>View Offers</button>}
                        <button className="btn btn-outline-danger rounded-5 px-4" onClick={() => removeFromAds(item)}>Remove</button>
                      </div>}
                    </div>
                  );
                })}
              </> : <>
                <div className='d-flex flex-column justify-content-end mt-5 pt-5 align-items-center' style={{marginRight:"310px"}}>
                  <i className="fa-solid fa-rectangle-ad text-secondary" style={{ fontSize: "75px" }}></i>
                  <p className='mt-5 fs-4 text-dark fw-bold'>You didn't post any products yet!</p>
                  <p className='mt-1 text-dark fw-bold'>Go to Sell Product to post some products.</p>
                </div>
              </>
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default MyAds;
