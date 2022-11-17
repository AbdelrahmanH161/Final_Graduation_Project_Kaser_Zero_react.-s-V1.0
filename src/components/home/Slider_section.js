import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import ReactCardSlider from 'react-card-slider-component';
function Slider_section() {
  const [pro , setpro]=useState([]);
  const [slides,setslider] = useState([])
  const nav = useNavigate();
  function gotod (data){
    nav("/product", { state: data })
  }
  useEffect(()=>{
    axios.get('http://localhost:4000/product/products').then((res) => {
      const arr =[]
      for (let i = 0; i < res.data.length; i++) {
          var url=`http://localhost:4000/${res.data[i].img[1]}`;
          var temp="";
            for(let x in url)
            {
            if(url[x]=='\\')
              temp+='/';
            else
            temp+=url[x];
          }
        arr.push({image: temp,title:res.data[i].title ,description:res.data[i].durationOfUse,clickEvent:()=>gotod(res.data[i])})
      }
      setslider(arr)
    });
  },[])
  return (
    <>
    <h2 className="fs-1 fw-bold text-center my-4"><span className="text-primary">Explore</span> Products</h2>
    <div className='container'>
    <ReactCardSlider slides={slides.slice(0,8)}/>
    </div>
    </>
  )
}

export default Slider_section