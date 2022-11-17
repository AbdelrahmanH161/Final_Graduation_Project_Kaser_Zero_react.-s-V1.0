import { React, useEffect, useState } from 'react';
import { useNavigate,useLocation } from 'react-router';
import ReactPaginate from 'react-paginate';
import '../Styling/pagination.css';


function ProductCategoriesContent({ data }) {

    var x = useLocation().state
    const nav = useNavigate();

    function productDetails(data) {
        nav("/product", { state: data })
    }

    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 12;

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(data.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(data.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, data]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.length;
        setItemOffset(newOffset);
    };

    return (
        <>
            <div className="col-lg-10 col-md-12 mt-">
                <div className="row row-cols-lg-4 row-cols-md-3 row-cols-sm-2 g-3 px-lg-5 px-md-2 py-2">
                    {currentItems.map((item, index) => {
                        return <div className="col" key={index}>
                                <div className="card_Products border border-1">
                                    <div className="img py-2" key={index}>
                                        <img src={'http://localhost:4000/' + item.img[0]} alt="..." width="90%"/>
                                    </div>
                                    <div className="p-2">
                                        <p className="m-0  text-primary fw-semibold fs-5"> {item.title}</p>
                                        <p className="px-2 m-0">{item.durationOfUse}</p>
                                        <p className="m-0  text-primary fw-semibold fs-5 px-1">EGY {item.price}</p>
                                    </div>
                                    <input type="button" defaultValue="View Details" className="btn btn-primary text-light w-100 rounded-0" onClick={() => productDetails(item)} />
                                </div>
                        </div>
                    })}
                </div>
            </div>

            <ReactPaginate
            breakLabel="..."
            nextLabel="Next »"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="« Previous"
            renderOnZeroPageCount={null}
            containerClassName="pagination"
            pageLinkClassName="page-num"
            previousLinkClassName="page-num"
            nextLinkClassName="page-num"
            activeLinkClassName="active"
            />
        </>
    );
}

export default ProductCategoriesContent;