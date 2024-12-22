import { useLoaderData } from 'react-router-dom';
import '../../components/Pagination/Pagination.css'
import { useEffect, useState } from 'react';
import axios from 'axios';

const Pagination = ({ info }) => {

    const [count, setCount]= useState(0);

    useEffect(()=>{
        axios.get('http://localhost:5000/product-count')
        .then(res=>setCount(res.data.count))
    },[count])


    const { currentPage, setCurrentPage, itemsInPage, setItemsInPage } = info;



    const totalPages = Math.ceil(count / itemsInPage);
    const pages = [...Array(totalPages).keys()];

    const handleDropdownItem = (e) => {

        let value = e.target.value;
        value = parseInt(value);

        setItemsInPage(value);
        setCurrentPage(0);
    }

    return (
        <div className='pagination'>

            <p>Current Page : {currentPage}</p>

            <button onClick={() => {
                if (currentPage > 0) {
                    setCurrentPage(currentPage - 1);
                }
            }}>Prev</button>

            {
                pages.map((page, index) => {
                    return <button
                        key={index}
                        onClick={() => setCurrentPage(page)}
                        className={page == currentPage ? `selected` : ''}
                    >{page}
                    </button>
                })
            }
            <button onClick={() => {
                if (currentPage < pages.length - 1) {
                    setCurrentPage(currentPage + 1);
                }
            }}>Next</button>

            <select className="page-dropdown" onChange={handleDropdownItem} name="" id="">
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">50</option>
            </select>
        </div>
    );
};

export default Pagination;