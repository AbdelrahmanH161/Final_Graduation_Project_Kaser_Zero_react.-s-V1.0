import { React, useEffect, useState } from 'react';
import ProductCategoriesContent from './ProductCategoriesContent';
import ProductCategoriesFilter from './ProductCategoriesFilter';
import '../Styling/prouduct_category.css'
import { useLocation } from 'react-router';
import axios from 'axios';


function ProductCategory() {

    const userId = JSON.parse(localStorage.getItem("authorization"))
    var x = useLocation().state
    var [prod, setPro] = useState([]);
    var [all, setAll] = useState([]);

    useEffect(function () {
        axios.get(`http://localhost:4000/product/productsofcategory/${x._id}`).then((res) => {
            if (userId) {
                let ex = res.data.filter((item) => {
                    return item.userId !== userId
                })
                setAll(ex)
                setPro(ex)
            }
            else {
                setAll(res.data)
                setPro(res.data)
            }
        })
    },[x]);
    // axios.get(`http://localhost:4000/product/products`).then((res) => {
    //         if(userId){
    //             let ex = res.data.filter((item)=>{
    //                 return item.userId!==userId
    //             })
    //             setAll(ex)
    //             setPro(ex)
    //         }
    //         else{
    //             setAll(res.data)
    //             setPro(res.data)
    //         }
    //     })
// }, [x])

function brandfliter(type) {
    console.log(type)
    if (type) {
        var x = all.filter((item) => item.brand == type);
        setPro([...x]);
        console.log(x)
    }
    else setPro([...all])
}

function durationfliter(type) {
    if (type) {
        var x = all.filter((item) => item.durationOfUse === type);
        setPro([...x]);
    }
    else setPro([...all])
}

function firstFilterFilter(type) {
    if (type) {
        var x = all.filter((item) => item.firstFilter === type);
        setPro([...x]);
    }
    else setPro([...all])
}

function secondFilterFilter(type) {
    if (type) {
        var x = all.filter((item) => item.secondFilter === type);
        setPro([...x]);
    }
    else setPro([...all])
}

function thirdFilterFilter(type) {
    if (type) {
        var x = all.filter((item) => item.thirdFilter === type);
        setPro([...x]);
    }
    else setPro([...all])
}

function colorfliterFilter(type) {
    if (type) {
        var x = all.filter((item) => item.color === type);
        setPro([...x]);
    }
    else setPro([...all])
}

function pricefilterFilter(type) {
    if (type === "Ascending") {
        var x = prod.sort((a, b) => { return a.price - b.price });
        setPro([...x]);
    }
    if (type === "Descending") {
        var x = prod.sort((a, b) => { return b.price - a.price });
        setPro([...x]);
    }
}


return (
    <>
        <div className="px-5 py-3">
            <section className="row justify-content-between mt-lg-3">
                <ProductCategoriesFilter brand={brandfliter} duration={durationfliter} firstFilterKey={firstFilterFilter} secondFilterKey={secondFilterFilter} thirdFilterKey={thirdFilterFilter} colorfliterKey={colorfliterFilter} pricefilterKey={pricefilterFilter}></ProductCategoriesFilter>
                <ProductCategoriesContent data={prod}></ProductCategoriesContent>
            </section>
        </div>
        {/* <Footer></Footer> */}
    </>
);
}

export default ProductCategory;