import React from 'react'
import Mobile from "../../images/mopile.png";
import PC from "../../images/labtop.png";
import consolegame from "../../images/consol.png"
function Top_cat_section() {
  return (
    <section className="my-5">
        <h2 className="fs-1 fw-bold text-center my-4"><span className="text-primary">Top</span> Category</h2>
        <div className="container">
          <div className="row row-cols-3 g-4">
            <div className="col">
              <div className="p-2 border border-1 rounded-3 shadow text-center">
                <div className="w-75 mx-auto">
                  <img src={Mobile} alt="" className="w-100 " />
                </div>
                <h2 className="text-center text-primary my-4">Mobile &amp; Tablet</h2>
                <a className="btn btn-primary w-50  text-light rounded-4 my-4">Explore  <i className="fa-solid fa-arrow-right" /></a>
              </div>
            </div>
            <div className="col">
              <div className="p-2 border border-1 rounded-3 shadow text-center">
                <div className="w-75 mx-auto">
                  <img src={PC} alt="" className="w-100 " />
                </div>
                <h2 className="text-center text-primary my-4">PC &amp; Laptop</h2>
                <button className="btn btn-primary w-50  text-light rounded-4 my-4">Explore  <i className="fa-solid fa-arrow-right" /></button>
              </div>
            </div>
            <div className="col">
              <div className="p-2 border border-1 rounded-3 shadow text-center">
                <div className="w-75 mx-auto">
                  <img src={consolegame} alt="" className="w-100 " />
                </div>
                <h2 className="text-center text-primary my-4">Console games</h2>
                <button className="btn btn-primary w-50  text-light rounded-4 my-4">Explore  <i className="fa-solid fa-arrow-right" /></button>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Top_cat_section