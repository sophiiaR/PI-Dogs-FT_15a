import React from 'react';

const DogCard = ({ name, image, temperament }) => {
    return (
        <div>
            <p>{name}</p>
            <img src={image} alt="dogimg" width="200px" height="200px" />
            <p>{temperament}</p>
        </div>
    )
}

export default DogCard;

