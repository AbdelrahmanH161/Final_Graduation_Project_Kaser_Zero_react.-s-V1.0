import React,{useEffect} from 'react';
import Product from '../components/product/Product'

function ProductPage() {
    useEffect(()=>{
        window.scrollTo(0,0)
      },[])
    return (
        <>
            <Product></Product>
        </>
    );
}

export default ProductPage;