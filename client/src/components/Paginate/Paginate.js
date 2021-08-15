import React from 'react';

const Paginate = ({ dogsPerPage, dogs, paginate}) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(dogs/dogsPerPage); i++) {
        pageNumbers.push(i)
    }
    
    return (
            <nav>
                <ul>
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
            </nav>
    )
}

export default Paginate;
