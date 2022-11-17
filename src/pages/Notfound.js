import React,{useEffect} from 'react';
import {useNavigate} from 'react-router';
import '../components/Styling/notfound.css'

function Notfound() {
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])
  const nav = useNavigate();

  function productDetails() {
    nav("/home")
  }

  return (
    <>
      <div className="text-center m-5">
        <p className='notfound'>404 - THE PAGE CAN'T BE FOUND</p>
        <p className="ops">OOPS!</p>
        <button className="btn btn-outline-primary fs-2 rounded-5 px-5" onClick={() => productDetails()}>Go To Home</button>
      </div>
    </>
  )
}

export default Notfound