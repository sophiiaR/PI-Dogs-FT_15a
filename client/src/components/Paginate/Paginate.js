import React from 'react';
import style from './Paginate.module.css';

const Paginate = ({ dogsPerPage, dogs, paginate}) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(dogs/dogsPerPage); i++) {
        pageNumbers.push(i)
    }
    
    return (
            <div className={style.content}>
                <ul className={style.pageNumbers}>
                    {
                        pageNumbers && pageNumbers.map(num => {
                            return(
                                <li key={num}>
                                    <button onClick={() => paginate(num)}>{num}</button>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
    )
}

export default Paginate;
