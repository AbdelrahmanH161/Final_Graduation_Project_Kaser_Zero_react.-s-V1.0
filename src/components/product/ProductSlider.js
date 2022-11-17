import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import ReactCardSlider from 'react-card-slider-component';

function ProductSlider() {
    
    let brandPro = useLocation().state;
    const [slides, setslider] = useState([])
    const nav = useNavigate();
    function gotod(data) {
        nav("/product", { state: data })
    }
    useEffect(() => {
        axios.get(`http://localhost:4000/product/productsbrand/${brandPro.brand}`).then((res) => {
            console.log(brandPro.brand)
            const arr = []
            for (let i = 0; i < res.data.length; i++) {
                var url = `http://localhost:4000/${res.data[i].img[1]}`;
                var temp = "";
                for (let x in url) {
                    // console.log(res.data[i])
                    if (url[x] == '\\')
                        temp += '/';
                    else
                        temp += url[x];
                }
                console.log(res.data[i])
                arr.push({ image: temp, title: res.data[i].title, description: res.data[i].durationOfUse, clickEvent: () => gotod(res.data[i]) })
            }
            setslider(arr)
            console.log(arr)
            console.log(url.replace(/\s+/g,''))
        });
    }, [])

    return (
        <>
            <h2 className="fs-1 fw-bold text-center my-4"><span className="text-primary">Similar</span> Products</h2>
            <div className='container'>
                <ReactCardSlider slides={slides} />
                
            </div>
        </>
    );
}

export default ProductSlider;