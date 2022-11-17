import React, { useState, useEffect } from "react";
import { axiosInstance } from "../config/axios";
import Side from '../components/Side'

function MyWishlist() {
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [titl, setTitl] = useState([])
  const [tru, setTru] = useState([])

  const userId = JSON.parse(localStorage.getItem("authorization"))

  useEffect(() => {
    axiosInstance.get(`/user/mywishlist/${userId}`).then((res) => {
      setItems(res.data.reverse());
      setIsLoading(false);
    });
    axiosInstance.get(`/product/products`).then((res) => {
      setTitl(res.data)
    })
  }, []);

  useEffect(() => {
    let w = []
    for(let i=0;i<items.length;i++){
      titl.filter((item)=>{
        if(item.userId!==userId && item.title === items[i]){
          w.push(item.title)
        }
      })
    }
    setTru(w)
  }, [items, titl])

  function handleSubmit(e) {
    e.preventDefault();
    const newWishListItem = e.target.name.value;

    if (!newWishListItem) return;
    setIsLoading(true);
    axiosInstance
      .post(`user/wishlist/${userId}`, {
        title: newWishListItem,
      })
      .then((res) => setItems((items) => [newWishListItem, ...items]))
      .finally(() => setIsLoading(false));
  }

  function removeFromWishlist(item) {
    setIsLoading(true);
    axiosInstance
      .delete(`user/wishlist/${userId}`, {
        data: { title: item },
      })
      .then(() =>
        setItems((perviousItems) =>
          perviousItems.filter((title) => item !== title)
        )
      )
      .finally(() => setIsLoading(false));
  }

  return (
    <>
      <div className="row me-0 mt-3 ">
        <Side></Side>
        <div className="col-9">
          <div className="d-flex flex-column gap-2 ps-5 ms-5 w-100">
            <h2 className="pb-5 fs-1 text-primary">Your Wish List</h2>
            <label className="fs-5">Add Product:</label>
            <form onSubmit={handleSubmit}>
              <div className="row ps-2">
                <input
                  type="text"
                  name="name"
                  placeholder="Product Name"
                  className="input border-1 border bg-light rounded p-2 col-10 me-2"
                />
                <button
                  type="submit"
                  className="col-1 ms-5 rounded bg-primary text-white border"
                >
                  Add
                </button>
              </div>
            </form>
            <br />
            {/* {isLoading && <p>Loading...</p>} */}
          </div>
          {/* <!-- items --> */}
          <div className="d-flex flex-column ps-5 ms-5 w-100">
            {items.map((item, index) => {
              return (
                <div className="item border rounded-3 p-4 mt-5 shadow-sm" key={index}>
                  <div className="info">
                    <label className="mb-3 fs-2 fw-bold">{item}</label>
                    <br />

                    {tru.includes(item) ? <div className="text-success fw-bold fs-5">Updates: It's in our stock! Go check for it now</div> : <div className="text-warning fw-bold fs-5">Updates: Not available yet. Stay tuned.</div>}
                    {/* {tru===false&& <div className="text-warning fw-bold fs-5">Updates: Not available yet. Stay tuned.</div>} */}
                  </div>
                  <div className="actions d-flex justify-content-end">
                    <button
                      className="btn text-bg-danger rounded-5 px-4"
                      onClick={() => removeFromWishlist(item)}
                    >
                      Remove from list
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default MyWishlist;
