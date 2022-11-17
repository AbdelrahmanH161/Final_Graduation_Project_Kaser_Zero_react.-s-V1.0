import React,{useEffect} from 'react';
import ProductCategory from '../components/ProductCategories/ProductCategory'

function ProductCategoryPage() {
    useEffect(()=>{
        window.scrollTo(0,0)
      },[])
    return (
        <>
            <ProductCategory></ProductCategory>
        </>
    );
}

export default ProductCategoryPage;