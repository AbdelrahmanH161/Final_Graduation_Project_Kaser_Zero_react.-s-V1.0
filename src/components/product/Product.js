import React from 'react';
import ProductDetails from './ProductDetails';
import ProductSlider from './ProductSlider';
import '../Styling/prouduct_category.css';


function Product() {
    return (
        <>
            <main className="container">
                <ProductDetails></ProductDetails>
                <ProductSlider></ProductSlider>
            </main>
        </>
    );
}

export default Product;